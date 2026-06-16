"use client";

import { useEffect, useMemo, useState } from "react";

const CONTACT = {
  name: "Khải",
  phone: "0812333067",
  zalo: "https://zalo.me/0812333067",
  facebook: "https://www.facebook.com/search/top?q=0812333067",
};

const listings = [
  {
    id: 1,
    title: "Duplex ban công gần Nguyễn Tất Thành",
    district: "Quận 4",
    type: "Duplex",
    status: "Trống sẵn",
    price: 8.5,
    area: "32m²",
    address: "Đường Tôn Đản, Quận 4",
    desc: "Gác cao thoáng, cửa sổ lớn, nội thất cơ bản, di chuyển nhanh sang Quận 1.",
    views: 128,
    likes: 24,
    image: "/rooms/room-1.svg",
  },
  {
    id: 2,
    title: "Studio full nội thất gần Lotte Mart",
    district: "Quận 7",
    type: "Studio",
    status: "Sắp trống",
    price: 7.2,
    area: "28m²",
    address: "Đường Nguyễn Thị Thập, Quận 7",
    desc: "Có bếp riêng, máy giặt chung, hầm xe rộng, phù hợp người đi làm.",
    views: 96,
    likes: 18,
    image: "/rooms/room-2.svg",
  },
  {
    id: 3,
    title: "Studio cửa sổ lớn khu Phạm Hùng",
    district: "Quận 8",
    type: "Studio",
    status: "Trống sẵn",
    price: 5.8,
    area: "24m²",
    address: "Đường Phạm Hùng, Quận 8",
    desc: "Phòng sáng, có thang máy, giờ giấc tự do, gần siêu thị và trạm xe buýt.",
    views: 211,
    likes: 35,
    image: "/rooms/room-3.svg",
  },
  {
    id: 4,
    title: "Duplex mới xây gần Phú Mỹ Hưng",
    district: "Nhà Bè",
    type: "Duplex",
    status: "Trống sẵn",
    price: 9.6,
    area: "38m²",
    address: "Đường Nguyễn Hữu Thọ, Nhà Bè",
    desc: "Không gian rộng, có ban công, máy lạnh, tủ bếp, thuận tiện đi Quận 7.",
    views: 174,
    likes: 29,
    image: "/rooms/room-4.svg",
  },
  {
    id: 5,
    title: "Studio yên tĩnh gần cầu Kênh Tẻ",
    district: "Quận 4",
    type: "Studio",
    status: "Đã thuê",
    price: 6.4,
    area: "25m²",
    address: "Đường Khánh Hội, Quận 4",
    desc: "Khu an ninh, nội thất gọn, phù hợp một người hoặc cặp đôi.",
    views: 83,
    likes: 12,
    image: "/rooms/room-5.svg",
  },
  {
    id: 6,
    title: "Duplex nội thất cao cấp khu Him Lam",
    district: "Quận 7",
    type: "Duplex",
    status: "Sắp trống",
    price: 10,
    area: "40m²",
    address: "Đường D1 Him Lam, Quận 7",
    desc: "Thiết kế hiện đại, bếp tách mùi, gần Crescent Mall và khu văn phòng.",
    views: 245,
    likes: 41,
    image: "/rooms/room-6.svg",
  },
];

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

function contactMessage(listing) {
  return encodeURIComponent(
    `Chào Khải, mình muốn được tư vấn phòng "${listing.title}" ở ${listing.district}, giá ${formatPrice(listing.price)}.`
  );
}

function getDisplayLikes(listing, liked) {
  return listing.likes + (liked ? 1 : 0);
}

export default function HomePage() {
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState("4");
  const [maxPrice, setMaxPrice] = useState("10");
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
      setQuickContactVisible(window.scrollY > 520);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredListings = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    const low = Math.min(Number(minPrice), Number(maxPrice));
    const high = Math.max(Number(minPrice), Number(maxPrice));

    const matched = listings.filter((listing) => {
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
  }, [filters, keyword, liked, maxPrice, minPrice, sortBy]);

  function updateFilter(group, value) {
    setFilters((current) => ({ ...current, [group]: value }));
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
          <a className="brand" href="#" aria-label="Tìm Phòng Trọ Cùng Tôi" onClick={closeMobileMenu}>
            <span className="brand-mark">TP</span>
            <span>
              <strong>Tìm Phòng Trọ Cùng Tôi</strong>
              <small>timphongtrocungtoi.vn</small>
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
            <a className="ghost-link" href="#filters" onClick={closeMobileMenu}>
              Bộ lọc
            </a>
            <a className="ghost-link" href="#listings" onClick={closeMobileMenu}>
              Bài đăng
            </a>
            <a className="primary-link" href={`tel:${CONTACT.phone}`} onClick={closeMobileMenu}>
              <Icon name="phone" />
              Gọi Khải
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-media" aria-hidden="true">
            <img src="/rooms/hero-room.svg" alt="" />
          </div>
          <div className="hero-content">
            <p className="eyebrow">Phòng trọ thật, tư vấn nhanh, khu Nam Sài Gòn</p>
            <h1>Tìm phòng Duplex hoặc Studio đúng ngân sách của bạn</h1>
            <p className="hero-copy">
              Lọc phòng theo khu vực, giá 4-10 triệu, tình trạng trống sẵn hoặc sắp trống.
              Khải hỗ trợ tư vấn qua Zalo, Facebook và điện thoại.
            </p>

            <form className="search-panel" onSubmit={submitSearch}>
              <div className="field field-wide">
                <label htmlFor="keyword">Tìm kiếm khu vực</label>
                <div className="input-icon">
                  <Icon name="search" />
                  <input
                    id="keyword"
                    name="keyword"
                    type="search"
                    placeholder="Nhập tên đường, quận, tiện ích gần đó"
                    autoComplete="off"
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="minPrice">Giá từ</label>
                <select id="minPrice" value={minPrice} onChange={(event) => setMinPrice(event.target.value)}>
                  <option value="4">4 triệu</option>
                  <option value="5">5 triệu</option>
                  <option value="6">6 triệu</option>
                  <option value="7">7 triệu</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="maxPrice">Đến</label>
                <select id="maxPrice" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)}>
                  <option value="10">10 triệu</option>
                  <option value="9">9 triệu</option>
                  <option value="8">8 triệu</option>
                  <option value="7">7 triệu</option>
                </select>
              </div>

              <button className="search-button" type="submit">
                <Icon name="sliders" />
                Lọc phòng
              </button>
            </form>
          </div>
        </section>

        <section className="filter-band" id="filters" aria-label="Bộ lọc phòng trọ">
          <div className="filter-grid">
            <FilterGroup
              title="Quận / khu vực"
              group="district"
              values={filterGroups.district}
              selected={filters.district}
              onChange={updateFilter}
            />
            <FilterGroup
              title="Dạng phòng"
              group="type"
              values={filterGroups.type}
              selected={filters.type}
              onChange={updateFilter}
            />
            <FilterGroup
              title="Tình trạng"
              group="status"
              values={filterGroups.status}
              selected={filters.status}
              onChange={updateFilter}
            />
          </div>
        </section>

        <section className="trust-strip" aria-label="Thông tin hỗ trợ">
          <div>
            <strong>4-10 triệu</strong>
            <span>Ngân sách phổ biến</span>
          </div>
          <div>
            <strong>4 khu vực</strong>
            <span>Quận 4, 7, 8, Nhà Bè</span>
          </div>
          <div>
            <strong>Zalo 0812333067</strong>
            <span>Khải tư vấn trực tiếp</span>
          </div>
        </section>

        <section className="listings-section" id="listings">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Bài đăng nổi bật</p>
              <h2>Phòng phù hợp đang được quan tâm</h2>
            </div>
            <div className="listing-tools">
              <p className="result-count" aria-live="polite">
                {filteredListings.length} phòng phù hợp
              </p>
              <label className="sort-field" htmlFor="sortBy">
                <span>Sắp xếp</span>
                <select id="sortBy" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                  <option value="featured">Nổi bật</option>
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
                  onLike={() => setLiked((current) => ({ ...current, [listing.id]: true }))}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name="home" />
              <h3>Chưa có phòng khớp bộ lọc</h3>
              <p>Hãy thử đổi khu vực, dạng phòng hoặc khoảng giá để xem thêm lựa chọn.</p>
            </div>
          )}
        </section>

        <section className="contact-section" aria-label="Liên hệ tư vấn">
          <div className="contact-copy">
            <p className="eyebrow">Tư vấn miễn phí</p>
            <h2>Cần xem phòng hoặc giữ chỗ?</h2>
            <p>
              Nhắn Khải thông tin khu vực, ngân sách và ngày muốn dọn vào. Mình sẽ gửi phòng
              còn phù hợp, video thực tế và hỗ trợ lịch xem.
            </p>
          </div>
          <div className="contact-actions">
            <a className="contact-button zalo" href={CONTACT.zalo} target="_blank" rel="noopener noreferrer">
              <Icon name="message" />
              Nhắn Zalo
            </a>
            <a className="contact-button facebook" href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">
              <Icon name="send" />
              Tìm Facebook
            </a>
            <a className="contact-button phone" href={`tel:${CONTACT.phone}`}>
              <Icon name="phoneCall" />
              0812 333 067
            </a>
          </div>
        </section>
      </main>

      {quickContactVisible ? <MobileContactBar /> : null}

      <footer className="footer">
        <p>© 2026 timphongtrocungtoi.vn - Khải hỗ trợ tìm phòng trọ khu Nam Sài Gòn.</p>
      </footer>
    </>
  );
}

function FilterGroup({ title, group, values, selected, onChange }) {
  return (
    <div className="filter-group">
      <span className="filter-title">{title}</span>
      <div className="chip-row">
        {values.map((value) => (
          <button
            className={`chip ${selected === value ? "is-active" : ""}`}
            key={value}
            type="button"
            onClick={() => onChange(group, value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}

function ListingCard({ listing, liked, onLike }) {
  const likes = getDisplayLikes(listing, liked);

  return (
    <article className="listing-card">
      <div className="listing-photo">
        <img src={listing.image} alt={listing.title} loading="lazy" />
        <span className={`status-badge ${statusClass(listing.status)}`}>{listing.status}</span>
      </div>
      <div className="card-body">
        <div className="listing-meta">
          <span>
            <Icon name="pin" />
            {listing.district}
          </span>
          <span>
            <Icon name="ruler" />
            {listing.area}
          </span>
        </div>
        <h3 className="listing-title">{listing.title}</h3>
        <p className="listing-desc">{listing.desc}</p>
        <div className="price-row">
          <span className="price">{formatPrice(listing.price)}</span>
          <span className="room-type">{listing.type}</span>
        </div>
        <div className="listing-meta">
          <span>
            <Icon name="navigation" />
            {listing.address}
          </span>
        </div>
        <div className="stats-row">
          <span className="stat">
            <Icon name="eye" />
            {listing.views}
          </span>
          <span className="stat">
            <Icon name="heart" />
            {likes}
          </span>
          <button
            className={`like-button ${liked ? "is-liked" : ""}`}
            type="button"
            aria-label={liked ? `Đã yêu thích ${listing.title}` : `Yêu thích ${listing.title}`}
            disabled={liked}
            onClick={onLike}
          >
            <Icon name="heart" />
            Yêu thích
          </button>
        </div>
        <div className="card-actions">
          <a
            className="message-link"
            href={`${CONTACT.zalo}?text=${contactMessage(listing)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="message" />
            Nhắn tin
          </a>
          <a className="contact-link" href={`tel:${CONTACT.phone}`}>
            <Icon name="phone" />
            Liên hệ
          </a>
        </div>
      </div>
    </article>
  );
}

function MobileContactBar() {
  return (
    <div className="mobile-contact-bar" aria-label="Liên hệ nhanh">
      <a href={CONTACT.zalo} target="_blank" rel="noopener noreferrer">
        <Icon name="message" />
        Zalo
      </a>
      <a href={`tel:${CONTACT.phone}`}>
        <Icon name="phoneCall" />
        Gọi
      </a>
      <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">
        <Icon name="send" />
        Facebook
      </a>
    </div>
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
