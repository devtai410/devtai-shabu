import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
} from 'react-router-dom';
import {useAppSelector} from '@/store';
import {Icon} from './Icon';

const ToastContext = createContext<
  (message: string) => void
>(() => {});
export const useToast = () => useContext(ToastContext);
export const Brand = () => (
  <span className="brand">
    <span className="brand-mark">
      <Icon name="pot" size={32} />
    </span>
    <span>
      <strong>
        devtai<span className="brand-dot">.</span>
      </strong>
      <small>SHABU & HAPPINESS</small>
    </span>
  </span>
);

export function Storefront() {
  const {pathname, search} = useLocation();
  const quantity = useAppSelector((state) =>
    state.cart.list.reduce(
      (sum, item) => sum + (item.quantity ?? 1),
      0,
    ),
  );
  const [toast, setToast] = useState('');
  const timer = useRef<
    ReturnType<typeof setTimeout> | undefined
  >(undefined);
  const announce = (message: string) => {
    setToast(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(''), 3500);
  };
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'instant'});
  }, [pathname, search]);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <ToastContext.Provider value={announce}>
      <a className="skip-link" href="#main-content">
        ข้ามไปยังเนื้อหา
      </a>
      <div className="announcement">
        <span>HAPPINESS IN EVERY POT</span>
        <i /> ชาบูดี ๆ ที่อยากให้คุณได้ลอง{' '}
        <Icon name="pot" size={15} />
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" aria-label="devtai หน้าแรก">
            <Brand />
          </Link>
          <nav
            className="desktop-nav"
            aria-label="เมนูหลัก"
          >
            <NavLink to="/" end>
              หน้าแรก
            </NavLink>
            <NavLink
              to="/shop"
              className={({isActive}) =>
                isActive && !search ? 'active' : ''
              }
            >
              เมนูอาหาร
            </NavLink>
            <Link
              className={
                pathname === '/shop' &&
                search.includes('sets')
                  ? 'active'
                  : ''
              }
              to="/shop?category=sets"
            >
              ชุดสุดคุ้ม
            </Link>
            <NavLink to="/all-offers">
              โปรโมชัน <span className="nav-dot" />
            </NavLink>
          </nav>
          <div className="header-actions">
            <Link
              className="reservation-link"
              to="/reservation"
            >
              <Icon name="calendar" size={18} />
              จองโต๊ะ
            </Link>
            <Link
              className="icon-button desktop-favorite"
              to="/favorite"
              aria-label="รายการโปรด"
            >
              <Icon name="heart" />
            </Link>
            <Link
              className="icon-button cart-button"
              to="/order"
              aria-label={`ตะกร้า ${quantity} รายการ`}
            >
              <Icon name="bag" />
              {quantity > 0 && (
                <span className="cart-count">
                  {quantity}
                </span>
              )}
            </Link>
            <Link
              className="user-avatar"
              to="/profile"
              aria-label="บัญชีของฉัน"
            >
              <Icon name="user" size={19} />
            </Link>
          </div>
        </div>
      </header>
      <div className="store-info">
        <div className="container store-info-inner">
          <span>
            <Icon name="pin" size={15} /> สาขาสุขุมวิท{' '}
            <span className="small-divider">|</span>{' '}
            กรุงเทพฯ
          </span>
          <span className="open-status">
            <i /> เปิดทุกวัน <span>11:00–22:00 น.</span>
          </span>
          <span className="store-delivery">
            <Icon name="truck" size={16} />{' '}
            ส่งความอร่อยถึงบ้านคุณ
          </span>
        </div>
      </div>
      <main
        id="main-content"
        className="main-content"
        tabIndex={-1}
      >
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-top">
          <Link to="/">
            <Brand />
          </Link>
          <p>
            วัตถุดิบดี น้ำซุปอร่อย คนข้าง ๆ ที่ใช่
            <br />
            เพราะความสุข เริ่มต้นที่หม้อเดียวกัน
          </p>
          <div className="footer-links">
            <Link to="/shop">เมนูอาหาร</Link>
            <Link to="/reservation">จองโต๊ะ</Link>
            <Link to="/order-history">
              คำสั่งซื้อของฉัน
            </Link>
          </div>
          <div className="footer-hours">
            <span>แวะมาหาเราได้ทุกวัน</span>
            <strong>11:00–22:00 น.</strong>
            <small>สาขาสุขุมวิท · กรุงเทพฯ</small>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} devtai. Shabu &
            happiness.
          </span>
          <span className="demo-label">
            หน้าร้านตัวอย่าง · ใช้ข้อมูลจำลอง
          </span>
        </div>
      </footer>
      <nav className="mobile-nav" aria-label="เมนูมือถือ">
        <NavLink to="/" end>
          <Icon name="home" />
          <span>หน้าแรก</span>
        </NavLink>
        <NavLink to="/shop">
          <Icon name="pot" />
          <span>เมนูอาหาร</span>
        </NavLink>
        <NavLink to="/favorite">
          <Icon name="heart" />
          <span>รายการโปรด</span>
        </NavLink>
        <NavLink to="/order">
          <span className="mobile-cart">
            <Icon name="bag" />
            {quantity > 0 && <b>{quantity}</b>}
          </span>
          <span>ตะกร้า</span>
        </NavLink>
      </nav>
      <div
        className={`toast ${toast ? 'visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        {toast && (
          <>
            <Icon name="check" size={19} />
            {toast}
          </>
        )}
      </div>
    </ToastContext.Provider>
  );
}

export function PageHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && (
          <p className="muted">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
export function EmptyState({
  icon = 'bag',
  title,
  description,
  action = 'เลือกเมนูอร่อย',
  to = '/shop',
}: {
  icon?: string;
  title: string;
  description: string;
  action?: string;
  to?: string;
}) {
  return (
    <div className="empty-state">
      <span className="empty-icon">
        <Icon name={icon} size={42} />
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
      <Link className="button primary" to={to}>
        {action}
        <Icon name="arrow" size={18} />
      </Link>
    </div>
  );
}
