import {Link} from 'react-router-dom';
import {PageHeading} from '@/components/shabu/Storefront';
import {Icon} from '@/components/shabu/Icon';

export function Profile() {
  return (
    <div className="container page-content">
      <PageHeading
        eyebrow="WELCOME TO THE devtai FAMILY"
        title="มุมความสุขของคุณ"
        description="เข้าถึงเมนูโปรดและคำสั่งซื้อของคุณได้ง่าย ๆ"
      />
      <div className="profile-layout">
        <div className="membership-card">
          <Icon name="pot" size={48} />
          <span>devtai FRIENDS</span>
          <h2>
            ยินดีต้อนรับ
            <br />
            เพื่อนคนพิเศษของเรา
          </h2>
          <p>อร่อยได้เลย โดยไม่ต้องสมัครสมาชิก</p>
          <small>
            หน้าบัญชีตัวอย่าง · ยังไม่มีระบบสมาชิก
          </small>
        </div>
        <div className="profile-menu">
          {[
            {
              to: '/order-history',
              icon: 'clock',
              title: 'คำสั่งซื้อของฉัน',
              detail: 'ดูรายการที่ทดลองสั่งซื้อไว้',
            },
            {
              to: '/favorite',
              icon: 'heart',
              title: 'เมนูโปรด',
              detail: 'กลับมาเลือกเมนูที่คุณชอบ',
            },
            {
              to: '/reservation',
              icon: 'calendar',
              title: 'จองโต๊ะ',
              detail: 'ทดลองจองช่วงเวลาดี ๆ ที่ร้าน',
            },
            {
              to: '/all-offers',
              icon: 'ticket',
              title: 'โปรโมชัน',
              detail: 'เพิ่มความสุขด้วยข้อเสนอพิเศษ',
            },
          ].map((item) => (
            <Link to={item.to} key={item.to}>
              <Icon name={item.icon} size={26} />
              <span>
                <strong>{item.title}</strong>
                <small>{item.detail}</small>
              </span>
              <Icon name="chevron" size={20} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
