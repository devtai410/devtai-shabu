import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@/store';
import {cartActions} from '@/store/cartSlice';
import {money} from '@/data/mock';
import {deliveryFee, type Fulfillment} from '@/data/local';
import {Icon} from './Icon';

export function OrderSummary({
  mode,
  checkout = false,
}: {
  mode: Fulfillment;
  checkout?: boolean;
}) {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [code, setCode] = useState(cart.promoCode);
  const [error, setError] = useState('');
  const fee = deliveryFee(cart.subtotal, mode);
  const apply = () => {
    if (code.trim().toUpperCase() !== 'DEVTAI10') {
      setError('ไม่พบโค้ดนี้ ลองใช้ DEVTAI10');
      return;
    }
    if (cart.subtotal < 500) {
      setError('โค้ดนี้ใช้ได้เมื่อสั่งครบ ฿500');
      return;
    }
    dispatch(cartActions.setDiscount(10));
    dispatch(cartActions.setPromoCode('DEVTAI10'));
    setCode('DEVTAI10');
    setError('');
  };
  return (
    <aside className="order-summary">
      <h2>สรุปความอร่อย</h2>
      <div className="summary-lines">
        <div>
          <span>
            ค่าอาหาร (
            {cart.list.reduce(
              (sum, item) => sum + (item.quantity ?? 1),
              0,
            )}{' '}
            รายการ)
          </span>
          <span>{money(cart.subtotal)}</span>
        </div>
        {cart.discountAmount > 0 && (
          <div className="discount-line">
            <span>ส่วนลด {cart.promoCode}</span>
            <span>−{money(cart.discountAmount)}</span>
          </div>
        )}
        <div>
          <span>
            {mode === 'delivery'
              ? 'ค่าจัดส่ง'
              : 'รับที่หน้าร้าน'}
          </span>
          <span className={fee === 0 ? 'green-label' : ''}>
            {fee === 0 ? 'ฟรี' : money(fee)}
          </span>
        </div>
      </div>
      {mode === 'delivery' && cart.subtotal < 999 && (
        <div className="free-delivery">
          <Icon name="truck" size={18} />
          <span>
            เพิ่มอีก{' '}
            <strong>{money(999 - cart.subtotal)}</strong>{' '}
            เพื่อรับส่งฟรี
          </span>
          <div className="delivery-progress">
            <i
              style={{
                width: `${Math.min(100, (cart.subtotal / 999) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}
      <div className="promo-entry">
        <label htmlFor="promo-code">
          <Icon name="ticket" size={18} />
          โค้ดส่วนลด
        </label>
        {cart.promoCode ? (
          <div className="applied-promo">
            <span>
              <Icon name="check" size={16} />
              {cart.promoCode} · ลด 10%
            </span>
            <button
              type="button"
              aria-label="นำโค้ดส่วนลดออก"
              onClick={() => {
                dispatch(cartActions.setDiscount(0));
                dispatch(cartActions.setPromoCode(''));
                setCode('');
              }}
            >
              <Icon name="close" size={16} />
            </button>
          </div>
        ) : (
          <>
            <div className="promo-input-row">
              <input
                id="promo-code"
                placeholder="ลองใช้ DEVTAI10"
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  setError('');
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    apply();
                  }
                }}
                aria-invalid={Boolean(error)}
                aria-describedby={
                  error ? 'promo-error' : undefined
                }
              />
              <button type="button" onClick={apply}>
                ใช้โค้ด
              </button>
            </div>
            {error && (
              <p
                className="field-error"
                id="promo-error"
                role="status"
              >
                {error}
              </p>
            )}
          </>
        )}
      </div>
      <div className="summary-total">
        <span>
          ยอดรวมทั้งหมด<small>ราคารวมภาษีแล้ว</small>
        </span>
        <strong>{money(cart.total + fee)}</strong>
      </div>
      {checkout ? (
        <button
          className="button primary full-width"
          type="submit"
          form="checkout-form"
        >
          ยืนยันคำสั่งซื้อจำลอง{' '}
          <Icon name="arrow" size={18} />
        </button>
      ) : (
        <Link
          className="button primary full-width"
          to={`/checkout?mode=${mode}`}
        >
          ดำเนินการสั่งซื้อ <Icon name="arrow" size={18} />
        </Link>
      )}
      <p className="summary-note">
        <Icon name="shield" size={15} />
        ทดลองสั่งซื้อได้ ไม่มีการชำระเงินจริง
      </p>
    </aside>
  );
}
export function FulfillmentChoice({
  mode,
  onChange,
}: {
  mode: Fulfillment;
  onChange: (mode: Fulfillment) => void;
}) {
  return (
    <div
      className="fulfillment-choice"
      role="group"
      aria-label="วิธีรับอาหาร"
    >
      <button
        type="button"
        className={mode === 'delivery' ? 'selected' : ''}
        aria-pressed={mode === 'delivery'}
        onClick={() => onChange('delivery')}
      >
        <Icon name="truck" size={23} />
        <span>
          <strong>จัดส่งถึงบ้าน</strong>
          <small>ประมาณ 30–45 นาที</small>
        </span>
        {mode === 'delivery' && (
          <Icon name="check" size={17} />
        )}
      </button>
      <button
        type="button"
        className={mode === 'pickup' ? 'selected' : ''}
        aria-pressed={mode === 'pickup'}
        onClick={() => onChange('pickup')}
      >
        <Icon name="bag" size={23} />
        <span>
          <strong>รับที่หน้าร้าน</strong>
          <small>สาขาสุขุมวิท · ไม่มีค่าส่ง</small>
        </span>
        {mode === 'pickup' && (
          <Icon name="check" size={17} />
        )}
      </button>
    </div>
  );
}
