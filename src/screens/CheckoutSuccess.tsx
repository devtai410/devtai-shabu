import {Link, useSearchParams} from 'react-router-dom';
import {readOrders, displayDate} from '@/data/local';
import {money} from '@/data/mock';
import {Icon} from '@/components/shabu/Icon';
import {EmptyState} from '@/components/shabu/Storefront';

export function CheckoutSuccess() {
  const [params] = useSearchParams();
  const order = readOrders().find(
    (item) => item.id === params.get('order'),
  );
  if (!order)
    return (
      <EmptyState
        title="ยังไม่มีคำสั่งซื้อนี้"
        description="ดูรายการที่บันทึกไว้ หรือเริ่มเลือกความอร่อยใหม่ได้เลย"
        action="ดูคำสั่งซื้อของฉัน"
        to="/order-history"
      />
    );
  return (
    <div className="container page-content">
      <div className="success-card">
        <div className="success-check">
          <Icon name="check" size={38} />
        </div>
        <p className="eyebrow">
          A LITTLE HAPPINESS IS ON ITS WAY
        </p>
        <h1>บันทึกมื้ออร่อยตัวอย่างแล้ว!</h1>
        <p className="muted">
          ขอบคุณที่แวะมาทดลองประสบการณ์ devtai
        </p>
        <div className="success-order-id">
          {order.id}
          <span className="demo-label">
            คำสั่งซื้อจำลอง
          </span>
        </div>
        <div className="success-details">
          <div>
            <span>ชื่อผู้รับ</span>
            <strong>{order.name}</strong>
          </div>
          <div>
            <span>วิธีรับอาหาร</span>
            <strong>
              {order.mode === 'delivery'
                ? 'จัดส่งถึงบ้าน'
                : 'รับที่หน้าร้าน'}
            </strong>
          </div>
          <div>
            <span>บันทึกเมื่อ</span>
            <strong>{displayDate(order.createdAt)}</strong>
          </div>
          <div>
            <span>ยอดรวม</span>
            <strong className="accent-text">
              {money(order.total)}
            </strong>
          </div>
        </div>
        <p className="demo-explanation">
          ไม่มีการสั่งอาหารหรือชำระเงินจริง
          <br />
          รายการนี้บันทึกไว้ในเบราว์เซอร์ของคุณสำหรับทดลอง
          UI
        </p>
        <div className="success-actions">
          <Link
            className="button primary"
            to="/order-history"
          >
            ดูคำสั่งซื้อของฉัน{' '}
            <Icon name="arrow" size={18} />
          </Link>
          <Link className="button secondary" to="/shop">
            เลือกเมนูต่อ
          </Link>
        </div>
      </div>
    </div>
  );
}
