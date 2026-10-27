import {Link} from 'react-router-dom';
import {readOrders, displayDate} from '@/data/local';
import {money} from '@/data/mock';
import {
  PageHeading,
  EmptyState,
} from '@/components/shabu/Storefront';
import {FoodImage} from '@/components/shabu/MenuCard';
import {Icon} from '@/components/shabu/Icon';

export function OrderHistory() {
  const orders = readOrders();
  return (
    <div className="container page-content">
      <PageHeading
        eyebrow="YOUR HAPPY MOMENTS"
        title="คำสั่งซื้อของฉัน"
        description="รายการทดลองที่บันทึกไว้ในเบราว์เซอร์นี้"
      />
      {orders.length ? (
        <div className="order-history-list">
          {orders.map((order) => (
            <article
              className="panel history-card"
              key={order.id}
            >
              <div className="history-heading">
                <div>
                  <strong>{order.id}</strong>
                  <p>{displayDate(order.createdAt)}</p>
                </div>
                <span className="demo-label">
                  บันทึกตัวอย่างแล้ว
                </span>
              </div>
              <div className="history-item-list">
                {order.items.map((item) => (
                  <div key={item.id}>
                    <FoodImage dish={item} />
                    <span>
                      <strong>{item.name}</strong>
                      <small>
                        {item.quantity ?? 1} ×{' '}
                        {money(item.price)}
                      </small>
                    </span>
                    <b>
                      {money(
                        item.price * (item.quantity ?? 1),
                      )}
                    </b>
                  </div>
                ))}
              </div>
              <div className="history-bottom">
                <span>
                  <Icon
                    name={
                      order.mode === 'delivery'
                        ? 'truck'
                        : 'bag'
                    }
                    size={18}
                  />
                  {order.mode === 'delivery'
                    ? 'จัดส่งถึงบ้าน'
                    : 'รับที่หน้าร้าน'}
                </span>
                <strong>รวม {money(order.total)}</strong>
                <Link
                  className="text-link"
                  to={`/checkout-success?order=${order.id}`}
                >
                  ดูรายละเอียด
                  <Icon name="arrow" size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="clock"
          title="ทุกมื้อดี ๆ เริ่มต้นได้ที่นี่"
          description="เมื่อทดลองสั่งซื้อแล้ว คุณจะพบรายการที่บันทึกไว้ในหน้านี้"
        />
      )}
    </div>
  );
}
