"use client";

import { useEffect, useMemo, useState } from "react";
import { normalizeSiteContent } from "../../lib/siteContent";

const filterGroups = {
  district: ["Tất cả", "Quận 4", "Quận 7", "Quận 8", "Nhà Bè"],
  type: ["Tất cả", "Duplex", "Studio"],
  status: ["Tất cả", "Trống sẵn", "Sắp trống", "Đã thuê"],
};

function formatPrice(price) {
  return Number.isInteger(price) ? `${price} triệu` : `${price.toFixed(1)} triệu`;
}

function statusClass(status) {
  if (status === "Trống sẵn") return "status-ready";
  if (status === "Sắp trống") return "status-soon";
  return "status-rented";
}

function contactMessage(listing, contact) {
  return encodeURIComponent(
    `Chào ${contact.name}, mình muốn được tư vấn phòng "${listing.title}" ở ${listing.district}, giá ${formatPrice(listing.price)}.`
  );
}

function getDisplayLikes(listing, liked) {
  return listing.likes + (liked ? 1 : 0);
}

function getPriceRangeMap(ranges) {
  return Object.fromEntries(ranges.map((range) => [range.value, [Number(range.low), Number(range.high)]]));
}

export default function RoomFinder({ content, listings }) {
  const pageContent = useMemo(() => normalizeSiteContent(content), [content]);
  const contact = pageContent.contact;
  const priceRanges = useMemo(() => getPriceRangeMap(pageContent.filters.priceRanges), [pageContent.filters.priceRanges]);
  const defaultPriceRange = pageContent.filters.priceRanges[0]?.value ?? "4-10";
  const listingItems = useMemo(() => (Array.isArray(listings) ? listings : []), [listings]);
  const [keyword, setKeyword] = useState("");
  const [priceRange, setPriceRange] = useState(defaultPriceRange);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickContactVisible, setQuickContactVisible] = useState(false);
  const [filters, setFilters] = useState({
    district: "Tất cả",
    type: "Tất cả",
    status: "Tất cả",
  });
  const [liked, setLiked] = useState({});

  useEffect(() => {
    function handleScroll() {
      setQuickContactVisible(window.scrollY > 1800);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredListings = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    const [low, high] = priceRanges[priceRange] ?? priceRanges[defaultPriceRange];

    const matched = listingItems.filter((listing) => {
      const haystack = `${listing.title} ${listing.district} ${listing.address} ${listing.desc} ${listing.type} ${listing.status}`.toLowerCase();
      const matchesKeyword = !normalizedKeyword || haystack.includes(normalizedKeyword);
      const matchesPrice = listing.price >= low && listing.price <= high;
      const matchesDistrict = filters.district === "Tất cả" || listing.district === filters.district;
      const matchesType = filters.type === "Tất cả" || listing.type === filters.type;
      const matchesStatus = filters.status === "Tất cả" || listing.status === filters.status;

      return matchesKeyword && matchesPrice && matchesDistrict && matchesType && matchesStatus;
    });

    return [...matched].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "views-desc") return b.views - a.views;
      if (sortBy === "likes-desc") return getDisplayLikes(b, liked[b.id]) - getDisplayLikes(a, liked[a.id]);
      return b.views + b.likes - (a.views + a.likes);
    });
  }, [defaultPriceRange, filters, keyword, liked, listingItems, priceRange, priceRanges, sortBy]);

  function updateFilter(group, value) {
    setFilters((current) => ({ ...current, [group]: value }));
  }

  function applyQuickFilter(filter) {
    if (filter.group === "price") {
      setPriceRange(filter.value);
      return;
    }

    updateFilter(filter.group, filter.value);
  }

  function resetFilters() {
    setKeyword("");
    setPriceRange(defaultPriceRange);
    setFilters({
      district: "Tất cả",
      type: "Tất cả",
      status: "Tất cả",
    });
    setSortBy("featured");
  }

  function submitSearch(event) {
    event.preventDefault();
    document.querySelector("#listings")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <nav className="nav-shell" aria-label="Thanh điều hướng chính">
          <a className="brand" href="#" aria-label={pageContent.brand.name} onClick={closeMobileMenu}>
            <span className="brand-mark">
              <Icon name="home" />
            </span>
            <span className="brand-copy">
              <strong>{pageContent.brand.name}</strong>
              <small>{pageContent.brand.tagline}</small>
            </span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label="Mở menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <Icon name={mobileMenuOpen ? "x" : "menu"} />
          </button>

          <div className={`nav-actions ${mobileMenuOpen ? "is-open" : ""}`}>
            {pageContent.navigation.map((item) => (
              <a className="nav-link" href={item.href} key={`${item.href}-${item.label}`} onClick={closeMobileMenu}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="nav-cta">
            <a className="outline-link" href={`tel:${contact.phone}`} onClick={closeMobileMenu}>
              <Icon name="phone" />
              {pageContent.header.callLabel}
            </a>
            <a className="primary-link" href={contact.zalo} target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>
              {pageContent.header.zaloLabel}
            </a>
          </div>
        </nav>
        <div className="sub-nav" aria-label="Liên kết nhanh">
          {pageContent.subNavigation.map((item) => (
            <a href={item.href} key={`${item.href}-${item.label}`}>
              {item.label}
            </a>
          ))}
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-content">
              <h1>
                {pageContent.hero.title} <span>{pageContent.hero.highlightedTitle}</span>
              </h1>
              <p className="hero-copy">{pageContent.hero.copy}</p>

              <div className="hero-actions">
                <a className="hero-button primary" href="#filters">
                  {pageContent.hero.primaryLabel}
                </a>
                <a className="hero-button blue" href={contact.zalo} target="_blank" rel="noopener noreferrer">
                  {pageContent.hero.secondaryLabel}
                </a>
                <a className="hero-button light" href={`tel:${contact.phone}`}>
                  {pageContent.hero.phoneLabel}
                </a>
              </div>

              <div className="hero-stats" aria-label="Thông tin nổi bật">
                {pageContent.hero.stats.map((stat) => (
                  <div key={`${stat.value}-${stat.label}`}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <HeroListingPreview preview={pageContent.preview} />
          </div>
        </section>

        <section className="filter-band" id="filters" aria-label="Bộ lọc phòng trọ">
          <div className="filter-grid">
            <div className="filter-head">
              <div>
                <h2>{pageContent.filters.title}</h2>
                <p>{pageContent.filters.copy}</p>
              </div>
              <button className="reset-button" type="button" onClick={resetFilters}>
                {pageContent.filters.resetLabel}
              </button>
            </div>

            <form className="search-panel" onSubmit={submitSearch}>
              <div className="field field-wide">
                <label htmlFor="keyword">{pageContent.filters.keywordLabel}</label>
                <div className="input-icon">
                  <Icon name="search" />
                  <input
                    id="keyword"
                    name="keyword"
                    type="search"
                    placeholder={pageContent.filters.keywordPlaceholder}
                    autoComplete="off"
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="priceRange">{pageContent.filters.priceLabel}</label>
                <select id="priceRange" value={priceRange} onChange={(event) => setPriceRange(event.target.value)}>
                  {pageContent.filters.priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="district">{pageContent.filters.districtLabel}</label>
                <select id="district" value={filters.district} onChange={(event) => updateFilter("district", event.target.value)}>
                  {filterGroups.district.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="roomType">{pageContent.filters.typeLabel}</label>
                <select id="roomType" value={filters.type} onChange={(event) => updateFilter("type", event.target.value)}>
                  {filterGroups.type.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="roomStatus">{pageContent.filters.statusLabel}</label>
                <select id="roomStatus" value={filters.status} onChange={(event) => updateFilter("status", event.target.value)}>
                  {filterGroups.status.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <button className="search-button" type="submit">
                {pageContent.filters.searchLabel}
              </button>
            </form>

            <div className="quick-chip-row" aria-label={pageContent.filters.quickFiltersLabel}>
              {pageContent.filters.quickFilters.map((filter) => (
                <button className="quick-chip" key={`${filter.group}-${filter.value}`} type="button" onClick={() => applyQuickFilter(filter)}>
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Thông tin hỗ trợ">
          {pageContent.trustStrip.map((stat) => (
            <div key={`${stat.value}-${stat.label}`}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section className="listings-section" id="listings">
          <div className="section-heading">
            <div>
              <h2>{pageContent.listings.title}</h2>
              <p className="result-count" aria-live="polite">
                {pageContent.listings.resultPrefix} {filteredListings.length} {pageContent.listings.resultSuffix}
              </p>
            </div>
            <div className="listing-tools">
              <label className="sort-field" htmlFor="sortBy">
                <span>{pageContent.listings.sortLabel}</span>
                <select id="sortBy" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                  <option value="featured">Mặc định</option>
                  <option value="price-asc">Giá thấp đến cao</option>
                  <option value="price-desc">Giá cao đến thấp</option>
                  <option value="views-desc">Lượt xem nhiều</option>
                  <option value="likes-desc">Yêu thích nhiều</option>
                </select>
              </label>
            </div>
          </div>

          {filteredListings.length > 0 ? (
            <div className="listing-grid">
              {filteredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  liked={Boolean(liked[listing.id])}
                  content={pageContent}
                  onLike={() => setLiked((current) => ({ ...current, [listing.id]: true }))}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name="home" />
              <h3>{pageContent.listings.emptyTitle}</h3>
              <p>{pageContent.listings.emptyCopy}</p>
            </div>
          )}
        </section>

        <section className="contact-section" id="contact" aria-label="Liên hệ tư vấn">
          <div className="contact-copy">
            <p className="eyebrow">{pageContent.contactSection.eyebrow}</p>
            <h2>{pageContent.contactSection.title}</h2>
            <p>{pageContent.contactSection.copy}</p>
          </div>
          <div className="contact-actions">
            <a className="contact-button zalo" href={contact.zalo} target="_blank" rel="noopener noreferrer">
              <Icon name="message" />
              {pageContent.contactSection.zaloLabel}
            </a>
            <a className="contact-button facebook" href={contact.facebook} target="_blank" rel="noopener noreferrer">
              <Icon name="send" />
              {pageContent.contactSection.facebookLabel}
            </a>
            <a className="contact-button phone" href={`tel:${contact.phone}`}>
              <Icon name="phoneCall" />
              {contact.phone}
            </a>
          </div>
        </section>
      </main>

      {quickContactVisible ? <MobileContactBar content={pageContent} /> : null}

      <footer className="footer">
        <p>{pageContent.footer.text}</p>
      </footer>
    </>
  );
}

function ListingCard({ content, listing, liked, onLike }) {
  const contact = content.contact;
  const likes = getDisplayLikes(listing, liked);

  return (
    <article className="listing-card">
      <div className="listing-photo">
        <img src={listing.image} alt={listing.title} loading="lazy" />
        <span className="type-badge">{listing.type}</span>
        <span className={`status-badge ${statusClass(listing.status)}`}>{listing.status}</span>
        <div className="photo-stats">
          <span>
            <Icon name="eye" />
            {listing.views.toLocaleString("vi-VN")} lượt xem
          </span>
          <span>
            <Icon name="heart" />
            {likes}
          </span>
        </div>
      </div>
      <div className="card-body">
        <div className="listing-title-row">
          <h3 className="listing-title">{listing.title}</h3>
          <span className="price">{formatPrice(listing.price).replace(" triệu", "tr")}</span>
        </div>

        <div className="listing-address">
          <span>
            <Icon name="pin" />
            {listing.address}
          </span>
        </div>

        <div className="spec-grid">
          <div>
            <span>Nội thất</span>
            <strong>{listing.furniture}</strong>
          </div>
          <div>
            <span>Dạng phòng</span>
            <strong>{listing.type}</strong>
          </div>
          <div>
            <span>Trạng thái</span>
            <strong>{listing.status}</strong>
          </div>
        </div>

        <p className="listing-desc">{listing.desc}</p>

        <div className="stats-row">
          <span className="stat">
            <Icon name="eye" />
            {listing.views.toLocaleString("vi-VN")}
          </span>
          <span className="stat">
            <Icon name="heart" />
            {likes}
          </span>
          <button
            className={`like-button ${liked ? "is-liked" : ""}`}
            type="button"
            aria-label={liked ? `${content.listings.likedLabel} ${listing.title}` : `${content.listings.likeLabel} ${listing.title}`}
            disabled={liked}
            onClick={onLike}
          >
            <Icon name="heart" />
            {content.listings.likeLabel}
          </button>
        </div>
        <div className="card-actions">
          <a
            className="message-link"
            href={`${contact.zalo}?text=${contactMessage(listing, contact)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="message" />
            {content.listings.messageLabel}
          </a>
          <a className="contact-link" href={`tel:${contact.phone}`}>
            <Icon name="phone" />
            {content.listings.contactLabel}
          </a>
        </div>
      </div>
    </article>
  );
}

function MobileContactBar({ content }) {
  const contact = content.contact;

  return (
    <div className="mobile-contact-bar" aria-label={content.mobileContact.ariaLabel}>
      <a href={contact.zalo} target="_blank" rel="noopener noreferrer">
        <Icon name="message" />
        {content.mobileContact.zaloLabel}
      </a>
      <a href={`tel:${contact.phone}`}>
        <Icon name="phoneCall" />
        {content.mobileContact.callLabel}
      </a>
      <a href={contact.facebook} target="_blank" rel="noopener noreferrer">
        <Icon name="send" />
        {content.mobileContact.facebookLabel}
      </a>
    </div>
  );
}

function HeroListingPreview({ preview }) {
  return (
    <aside className="hero-preview" aria-label="Phòng gợi ý nổi bật">
      <div className="floating-badge">{preview.badge}</div>
      <div className="preview-frame">
        <div className="preview-image">
          <img src={preview.image} alt={preview.imageAlt} />
        </div>
        <div className="preview-body">
          <div className="preview-title-row">
            <h2>{preview.title}</h2>
            <strong>{preview.price}</strong>
          </div>
          <p>
            <Icon name="pin" />
            {preview.location}
          </p>
          <p>
            <Icon name="eye" />
            {preview.socialProof}
          </p>
          <p>
            <Icon name="home" />
            {preview.status}
          </p>
        </div>
      </div>
    </aside>
  );
}

function Icon({ name }) {
  const common = {
    "aria-hidden": "true",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    viewBox: "0 0 24 24",
  };

  const paths = {
    eye: (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />,
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
    menu: (
      <>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </>
    ),
    message: (
      <>
        <path d="M21 12a8 8 0 0 1-8 8H7l-4 3 1.4-5A8 8 0 1 1 21 12Z" />
        <path d="M8 12h8" />
        <path d="M8 9h6" />
      </>
    ),
    navigation: (
      <>
        <path d="m3 11 18-8-8 18-2-8-8-2Z" />
        <path d="m11 13 10-10" />
      </>
    ),
    phone: (
      <>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
      </>
    ),
    phoneCall: (
      <>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
        <path d="M14 2a8 8 0 0 1 8 8" />
        <path d="M14 6a4 4 0 0 1 4 4" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    ruler: (
      <>
        <path d="m16 2 6 6L8 22l-6-6Z" />
        <path d="m7 15 2 2" />
        <path d="m10 12 2 2" />
        <path d="m13 9 2 2" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </>
    ),
    sliders: (
      <>
        <path d="M4 21v-7" />
        <path d="M4 10V3" />
        <path d="M12 21v-9" />
        <path d="M12 8V3" />
        <path d="M20 21v-5" />
        <path d="M20 12V3" />
        <path d="M2 14h4" />
        <path d="M10 8h4" />
        <path d="M18 16h4" />
      </>
    ),
    x: (
      <>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}
