import {Link} from 'react-router-dom';
import {
  PageHeading,
  useToast,
} from '@/components/shabu/Storefront';
import {Icon} from '@/components/shabu/Icon';

export function AllOffers() {
  const toast = useToast();
  return (
    <div className="container page-content">
      <PageHeading
        eyebrow="GOOD FOOD, BETTER DEALS"
        title="เติมความสุข ให้คุ้มกว่าเดิม"
        description="ความอร่อยและข้อเสนอพิเศษที่เราเตรียมไว้ให้คุณ"
      />
      <div className="offers-list">
        <article className="offer-detail">
          <div className="offer-visual red-offer">
            <span>
              WELCOME
              <br />
              TO devtai
            </span>
            <strong>
              10<small>% OFF</small>
            </strong>
            <Icon name="pot" size={85} />
          </div>
          <div>
            <span className="pill">สำหรับมื้อแรก</span>
            <h2>มื้อแรกที่เจอกัน รับส่วนลด 10%</h2>
            <p>
              ให้มื้อแรกของคุณพิเศษกว่าเดิม ใช้โค้ด DEVTAI10
              ที่หน้าตะกร้าเมื่อสั่งอาหารครบ ฿500
            </p>
            <ul className="offer-conditions">
              <li>
                ส่วนลด 10% จากค่าอาหาร ไม่รวมค่าจัดส่ง
              </li>
              <li>ใช้ได้ทั้งแบบจัดส่งและรับที่หน้าร้าน</li>
              <li>โปรโมชันจำลองสำหรับทดลองการใช้งาน</li>
            </ul>
            <button
              className="button primary"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(
                    'DEVTAI10',
                  );
                  toast('คัดลอกโค้ด DEVTAI10 แล้ว');
                } catch {
                  toast(
                    'ใส่โค้ด DEVTAI10 ที่หน้าตะกร้าได้เลย',
                  );
                }
              }}
            >
              <Icon name="copy" size={18} />
              คัดลอกโค้ด DEVTAI10
            </button>
          </div>
        </article>
        <article className="offer-detail">
          <img
            className="offer-visual"
            src="/images/shabu-hero.webp"
            alt="ชุดชาบูพร้อมหน้าสำหรับ 4 คน"
          />
          <div>
            <span className="pill">ความสุขสำหรับ 4 คน</span>
            <h2>ชุดพร้อมหน้า อร่อยครบทั้งครอบครัว</h2>
            <p>
              เนื้อวากิว หมูคุโรบูตะ ซีฟู้ด ชุดผัก และน้ำซุป
              2 รส ครบจบในชุดเดียว จาก ฿1,299 เหลือเพียง
              ฿1,099
            </p>
            <ul className="offer-conditions">
              <li>พร้อมน้ำจิ้มพอนสึและน้ำจิ้มงา</li>
              <li>
                รับสิทธิ์จัดส่งฟรีเมื่อยอดอาหารครบ ฿999
              </li>
              <li>ราคาและรายละเอียดเป็นข้อมูลตัวอย่าง</li>
            </ul>
            <Link
              className="button primary"
              to="/dish-description/108"
            >
              ดูชุดพร้อมหน้า <Icon name="arrow" size={18} />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
