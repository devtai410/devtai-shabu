import {Link} from 'react-router-dom';
import {Icon} from '@/components/shabu/Icon';
import {MenuBrowser} from '@/components/shabu/MenuBrowser';
import {useToast} from '@/components/shabu/Storefront';

export function Home() {
  const toast = useToast();
  return (
    <>
      <section className="hero-section">
        <div className="container hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" /> MADE FOR
              GOOD MOMENTS
            </p>
            <h1>
              ความสุขดี ๆ<br />
              เริ่มต้นที่<span>หม้อชาบู</span>
            </h1>
            <p className="hero-description">
              วัตถุดิบที่เราคัดสรร น้ำซุปที่เราใส่ใจ
              <br />
              พร้อมเสิร์ฟความอร่อย ให้ทุกมื้อเป็นช่วงเวลาดี
              ๆ
            </p>
            <div className="hero-actions">
              <Link className="button primary" to="/shop">
                เลือกเมนูอร่อย{' '}
                <Icon name="arrow" size={19} />
              </Link>
              <Link
                className="button hero-booking"
                to="/reservation"
              >
                <Icon name="calendar" size={18} />
                จองโต๊ะที่ร้าน
              </Link>
            </div>
            <div className="hero-proof">
              <div className="proof-stars">★★★★★</div>
              <span>
                <strong>4.9</strong> / 5 <i />{' '}
                ความอร่อยที่ทุกคนหลงรัก
              </span>
            </div>
          </div>
          <div className="hero-photo">
            <img
              src="/images/shabu-hero.webp"
              alt="หม้อชาบูสองน้ำซุป พร้อมเนื้อวากิว ผักสด และน้ำจิ้มญี่ปุ่น"
              fetchPriority="high"
            />
            <div className="hero-photo-overlay" />
            <div className="hero-stamp">
              <span>こだわりの味</span>
              <Icon name="pot" size={27} />
              <strong>อร่อยทุกหม้อ</strong>
              <small>HAPPINESS IN EVERY POT</small>
            </div>
            <div className="hero-image-caption">
              <span className="caption-dot" /> สดใหม่ ใส่ใจ
              ในทุกวัน <span>THE devtai EXPERIENCE</span>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="quality-strip">
          <div>
            <span className="quality-icon">
              <Icon name="beef" size={29} />
            </span>
            <span>
              <strong>คัดสรรวัตถุดิบพรีเมียม</strong>
              <small>สดใหม่ อร่อยได้อย่างมั่นใจ</small>
            </span>
          </div>
          <div>
            <span className="quality-icon">
              <Icon name="pot" size={29} />
            </span>
            <span>
              <strong>น้ำซุปเคี่ยวด้วยความใส่ใจ</strong>
              <small>กลมกล่อม หอมอร่อยทุกหม้อ</small>
            </span>
          </div>
          <div>
            <span className="quality-icon">
              <Icon name="heart" size={28} />
            </span>
            <span>
              <strong>มื้อดี ๆ ที่อยากแบ่งปัน</strong>
              <small>พร้อมอร่อยที่ร้านและที่บ้าน</small>
            </span>
          </div>
        </div>
      </div>
      <section className="container home-menu">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FIND YOUR FAVORITE</p>
            <h2>
              เลือกความอร่อยในแบบคุณ
              <span className="accent-dot">.</span>
            </h2>
            <p className="muted">
              จะมื้อเล็กหรือมื้อใหญ่ ก็มีเมนูที่ใช่รออยู่
            </p>
          </div>
          <Link
            className="text-link desktop-view-all"
            to="/shop"
          >
            ดูเมนูทั้งหมด <Icon name="arrow" size={18} />
          </Link>
        </div>
        <MenuBrowser compact />
      </section>
      <section className="container promo-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              A LITTLE EXTRA HAPPINESS
            </p>
            <h2>ความอร่อยที่คุ้มกว่าเดิม</h2>
          </div>
          <Link className="text-link" to="/all-offers">
            ดูโปรโมชัน <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="promo-grid">
          <article className="promo-card first-order">
            <div>
              <span className="promo-tag">
                WELCOME TO devtai
              </span>
              <h3>
                มื้อแรกที่เจอกัน
                <br />
                รับความสุขเพิ่ม <strong>10%</strong>
              </h3>
              <p>
                เมื่อสั่งครบ ฿500 ใช้โค้ดได้ที่หน้าตะกร้า
              </p>
              <button
                className="coupon-button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      'DEVTAI10',
                    );
                    toast('คัดลอกโค้ด DEVTAI10 แล้ว');
                  } catch {
                    toast(
                      'ใช้โค้ด DEVTAI10 ที่หน้าตะกร้าได้เลย',
                    );
                  }
                }}
              >
                <Icon name="ticket" size={18} />
                <strong>DEVTAI10</strong>
                <span>คัดลอกโค้ด</span>
                <Icon name="copy" size={15} />
              </button>
            </div>
            <div className="promo-art" aria-hidden="true">
              <span>
                10<small>%</small>
              </span>
              <Icon name="pot" size={72} />
            </div>
          </article>
          <article className="promo-card family-promo">
            <div>
              <span className="promo-tag">
                BETTER TOGETHER
              </span>
              <h3>
                พร้อมหน้า พร้อมหม้อ
                <br />
                อิ่มสุขทั้งครอบครัว
              </h3>
              <p>ชุดชาบู 4 คน จาก ฿1,299 เหลือ ฿1,099</p>
              <Link
                className="text-link"
                to="/dish-description/108"
              >
                ดูชุดพร้อมหน้า{' '}
                <Icon name="arrow" size={18} />
              </Link>
            </div>
            <img
              src="/images/shabu-hero.webp"
              alt="ชุดชาบูสำหรับครอบครัว"
              loading="lazy"
            />
          </article>
        </div>
      </section>
      <section className="container story-strip">
        <span className="story-japanese" aria-hidden="true">
          鍋
        </span>
        <div>
          <p className="eyebrow">MORE THAN JUST SHABU</p>
          <h2>อร่อยด้วยกัน อุ่นใจกว่าเสมอ</h2>
          <p>
            ชวนคนที่คุณรัก มาล้อมวงความสุขรอบหม้อชาบูที่
            devtai
          </p>
        </div>
        <Link
          className="button secondary"
          to="/reservation"
        >
          จองช่วงเวลาดี ๆ <Icon name="arrow" size={18} />
        </Link>
      </section>
    </>
  );
}
