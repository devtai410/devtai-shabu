import {useState, type FormEvent} from 'react';
import {
  Link,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@/store';
import {cartActions} from '@/store/cartSlice';
import {
  deliveryFee,
  saveOrder,
  type DemoOrder,
  type Fulfillment,
} from '@/data/local';
import {
  OrderSummary,
  FulfillmentChoice,
} from '@/components/shabu/OrderSummary';
import {
  EmptyState,
  PageHeading,
  useToast,
} from '@/components/shabu/Storefront';
import {Icon} from '@/components/shabu/Icon';

export function Checkout() {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [params, setParams] = useSearchParams();
  const mode: Fulfillment =
    params.get('mode') === 'pickup' ? 'pickup' : 'delivery';
  const [payment, setPayment] = useState('cash');
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fee = deliveryFee(cart.subtotal, mode);
    const order: DemoOrder = {
      id: `NB-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      name: String(form.get('name')).trim(),
      phone: String(form.get('phone')),
      address:
        mode === 'delivery'
          ? String(form.get('address')).trim()
          : 'รับที่หน้าร้าน · สาขาสุขุมวิท',
      note: String(form.get('note') ?? '').trim(),
      mode,
      payment,
      items: cart.list.map((item) => ({...item})),
      subtotal: cart.subtotal,
      discount: cart.discountAmount,
      delivery: fee,
      total: cart.total + fee,
    };
    try {
      saveOrder(order);
      dispatch(cartActions.resetCart());
      navigate(`/checkout-success?order=${order.id}`, {
        replace: true,
      });
    } catch {
      toast(
        'บันทึกไม่ได้ กรุณาอนุญาตพื้นที่จัดเก็บของเบราว์เซอร์แล้วลองใหม่',
      );
    }
  };
  if (!cart.list.length)
    return (
      <div className="container page-content">
        <EmptyState
          title="เลือกเมนูก่อนเริ่มสั่งซื้อ"
          description="ความอร่อยอีกมากมายรอให้คุณเลือกอยู่"
        />
      </div>
    );
  return (
    <div className="container page-content">
      <Link
        className="back-link"
        to={`/order?mode=${mode}`}
      >
        <Icon name="left" size={16} />
        กลับไปที่ตะกร้า
      </Link>
      <PageHeading
        eyebrow="ALMOST A HAPPY MEAL"
        title="เตรียมส่งความอร่อยถึงคุณ"
        description="กรอกข้อมูลสำหรับทดลองขั้นตอนสั่งซื้อ"
      />
      <div className="checkout-layout">
        <form id="checkout-form" onSubmit={submit}>
          <FulfillmentChoice
            mode={mode}
            onChange={(value) =>
              setParams({mode: value}, {replace: true})
            }
          />
          <section className="panel form-panel">
            <h2>
              <span className="step-number">1</span>ข้อมูล
              {mode === 'delivery'
                ? 'ผู้รับอาหาร'
                : 'ผู้รับที่หน้าร้าน'}
            </h2>
            <div className="form-grid">
              <label>
                ชื่อผู้รับ <span>*</span>
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="ชื่อและนามสกุล"
                  required
                  minLength={2}
                  maxLength={100}
                />
              </label>
              <label>
                เบอร์โทรศัพท์ <span>*</span>
                <input
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="08X-XXX-XXXX"
                  required
                  pattern="0[0-9]{8,9}"
                  title="กรอกเบอร์โทรศัพท์ 9–10 หลัก เริ่มต้นด้วย 0"
                />
              </label>
              {mode === 'delivery' ? (
                <label className="full-field">
                  ที่อยู่จัดส่ง <span>*</span>
                  <textarea
                    name="address"
                    autoComplete="street-address"
                    placeholder="บ้านเลขที่ อาคาร ถนน แขวง เขต จังหวัด และรหัสไปรษณีย์"
                    required
                    minLength={12}
                    maxLength={500}
                    rows={3}
                  />
                </label>
              ) : (
                <div className="pickup-location full-field">
                  <Icon name="pin" size={22} />
                  <div>
                    <strong>devtai สาขาสุขุมวิท</strong>
                    <p>
                      รับอาหารประมาณ 30–45 นาที
                      หลังยืนยันคำสั่งซื้อ
                    </p>
                    <small>
                      ข้อมูลสถานที่สำหรับตัวอย่างหน้าร้าน
                    </small>
                  </div>
                </div>
              )}
              <label className="full-field">
                หมายเหตุเพิ่มเติม <small>(ไม่จำเป็น)</small>
                <textarea
                  name="note"
                  placeholder="เช่น ไม่รับช้อนส้อม หรือจุดสังเกตสำหรับจัดส่ง"
                  maxLength={300}
                  rows={2}
                />
              </label>
            </div>
          </section>
          <section className="panel form-panel">
            <h2>
              <span className="step-number">2</span>
              วิธีชำระเงิน
            </h2>
            <div className="payment-options">
              <label
                className={
                  payment === 'cash' ? 'selected' : ''
                }
              >
                <input
                  type="radio"
                  name="payment"
                  checked={payment === 'cash'}
                  onChange={() => setPayment('cash')}
                />
                <span>
                  <strong>ชำระเมื่อรับอาหาร</strong>
                  <small>
                    ทดลองแสดงขั้นตอน ไม่มีการเรียกเก็บเงิน
                  </small>
                </span>
              </label>
              <label
                className={
                  payment === 'promptpay' ? 'selected' : ''
                }
              >
                <input
                  type="radio"
                  name="payment"
                  checked={payment === 'promptpay'}
                  onChange={() => setPayment('promptpay')}
                />
                <span>
                  <strong>พร้อมเพย์</strong>
                  <small>
                    แสดงตัวเลือกเท่านั้น
                    ยังไม่เชื่อมต่อการชำระเงิน
                  </small>
                </span>
              </label>
            </div>
          </section>
          <p className="subtle-note demo-checkout">
            <Icon name="shield" size={19} />
            <span>
              นี่คือการทดลองใช้งาน
              ข้อมูลบันทึกในเบราว์เซอร์นี้เท่านั้น
              ไม่มีการส่งคำสั่งซื้อไปยังร้าน
            </span>
          </p>
        </form>
        <OrderSummary mode={mode} checkout />
      </div>
    </div>
  );
}
