import {Link, useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@/store';
import {cartActions} from '@/store/cartSlice';
import {money} from '@/data/mock';
import type {Fulfillment} from '@/data/local';
import {
  PageHeading,
  EmptyState,
} from '@/components/shabu/Storefront';
import {
  FoodImage,
  QuantityControl,
} from '@/components/shabu/MenuCard';
import {
  OrderSummary,
  FulfillmentChoice,
} from '@/components/shabu/OrderSummary';
import {Icon} from '@/components/shabu/Icon';

export function Order() {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [params, setParams] = useSearchParams();
  const mode: Fulfillment =
    params.get('mode') === 'pickup' ? 'pickup' : 'delivery';
  return (
    <div className="container page-content">
      <PageHeading
        eyebrow="YOUR HAPPY POT"
        title="ตะกร้าความอร่อย"
        description="อีกนิดเดียว ก็พร้อมสำหรับมื้อดี ๆ ของคุณ"
      >
        <Link className="text-link" to="/shop">
          <Icon name="plus" size={17} />
          เลือกเมนูเพิ่ม
        </Link>
      </PageHeading>
      {cart.list.length === 0 ? (
        <EmptyState
          title="หม้อนี้ยังรอความอร่อยอยู่"
          description="เลือกเมนูที่คุณชอบ แล้วเริ่มต้นมื้อดี ๆ ด้วยกัน"
        />
      ) : (
        <div className="checkout-layout">
          <div>
            <FulfillmentChoice
              mode={mode}
              onChange={(value) =>
                setParams({mode: value}, {replace: true})
              }
            />
            <section className="panel cart-panel">
              <div className="panel-heading">
                <h2>เมนูที่คุณเลือก</h2>
                <span>{cart.list.length} เมนู</span>
              </div>
              <div className="cart-items">
                {cart.list.map((dish) => (
                  <article
                    className="cart-item"
                    key={dish.id}
                  >
                    <Link
                      to={`/dish-description/${dish.id}`}
                    >
                      <FoodImage dish={dish} />
                    </Link>
                    <div className="cart-item-info">
                      <Link
                        to={`/dish-description/${dish.id}`}
                      >
                        <h3>{dish.name}</h3>
                      </Link>
                      <p>{dish.weight}</p>
                      <strong>{money(dish.price)}</strong>
                    </div>
                    <QuantityControl
                      dish={dish}
                      quantity={dish.quantity ?? 1}
                    />
                    <div className="cart-line-total">
                      {money(
                        dish.price * (dish.quantity ?? 1),
                      )}
                    </div>
                    <button
                      className="icon-button remove-item"
                      aria-label={`นำ ${dish.name} ออกจากตะกร้า`}
                      onClick={() =>
                        dispatch(
                          cartActions.deleteFromCart(
                            dish.id,
                          ),
                        )
                      }
                    >
                      <Icon name="trash" size={18} />
                    </button>
                  </article>
                ))}
              </div>
            </section>
            <div className="subtle-note">
              <Icon name="leaf" size={21} />
              <span>
                เราเตรียมวัตถุดิบสดใหม่สำหรับทุกคำสั่งซื้อ
                <br />
                <small>
                  ชุดชาบูจัดส่งเป็นวัตถุดิบพร้อมปรุง
                  แยกน้ำซุปและน้ำจิ้ม
                </small>
              </span>
            </div>
          </div>
          <OrderSummary mode={mode} />
        </div>
      )}
    </div>
  );
}
