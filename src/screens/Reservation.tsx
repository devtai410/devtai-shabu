import {useState, type FormEvent} from 'react';
import {Link} from 'react-router-dom';
import {
  PageHeading,
  useToast,
} from '@/components/shabu/Storefront';
import {Icon} from '@/components/shabu/Icon';

export function Reservation() {
  const [reservation, setReservation] = useState<{
    name: string;
    date: string;
    time: string;
    guests: string;
  } | null>(null);
  const toast = useToast();
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Bangkok',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = {
      name: String(data.get('name')).trim(),
      date: String(data.get('date')),
      time: String(data.get('time')),
      guests: String(data.get('guests')),
    };
    const now = new Date();
    if (
      new Date(
        `${next.date}T${next.time}:00+07:00`,
      ).getTime() <= now.getTime()
    ) {
      toast('กรุณาเลือกวันและเวลาที่ยังมาไม่ถึง');
      return;
    }
    try {
      localStorage.setItem(
        'nabe-demo-reservation',
        JSON.stringify(next),
      );
      setReservation(next);
    } catch {
      toast(
        'บันทึกไม่ได้ กรุณาอนุญาตพื้นที่จัดเก็บของเบราว์เซอร์',
      );
    }
  };
  return (
    <div className="container page-content">
      <PageHeading
        eyebrow="SAVE A SEAT FOR HAPPINESS"
        title="จองโต๊ะสำหรับช่วงเวลาดี ๆ"
        description="เลือกวัน ชวนคนโปรด แล้วมาล้อมวงความอร่อยด้วยกัน"
      />
      <div className="reservation-layout">
        <div className="reservation-photo">
          <img
            src="/images/shabu-hero.webp"
            alt="ชาบูมื้อพิเศษสำหรับคุณและคนที่รัก"
          />
          <div>
            <Icon name="pot" size={34} />
            <h2>
              มีหม้ออุ่น ๆ<br />
              รอคุณอยู่เสมอ
            </h2>
            <p>
              devtai สาขาสุขุมวิท
              <br />
              เปิดทุกวัน 11:00–22:00 น.
            </p>
          </div>
        </div>
        {reservation ? (
          <div className="panel reservation-success">
            <div className="success-check">
              <Icon name="check" size={32} />
            </div>
            <h2>บันทึกการจองตัวอย่างแล้ว</h2>
            <p>
              คุณ{reservation.name} · {reservation.guests}{' '}
              ท่าน
            </p>
            <strong>
              {new Date(
                `${reservation.date}T12:00:00+07:00`,
              ).toLocaleDateString('th-TH', {
                dateStyle: 'long',
                timeZone: 'Asia/Bangkok',
              })}{' '}
              เวลา {reservation.time} น.
            </strong>
            <p className="demo-explanation">
              เป็นการทดลองหน้าจอเท่านั้น
              <br />
              ยังไม่มีการจองโต๊ะหรือแจ้งร้านจริง
            </p>
            <button
              className="button primary"
              onClick={() => setReservation(null)}
            >
              ทดลองจองอีกครั้ง
            </button>
            <Link className="text-link" to="/shop">
              เลือกดูเมนูก่อนได้เลย{' '}
              <Icon name="arrow" size={18} />
            </Link>
          </div>
        ) : (
          <form
            className="panel form-panel reservation-form"
            onSubmit={submit}
          >
            <h2>รายละเอียดการจอง</h2>
            <div className="form-grid">
              <label>
                ชื่อผู้จอง <span>*</span>
                <input
                  name="name"
                  placeholder="ชื่อของคุณ"
                  autoComplete="name"
                  minLength={2}
                  maxLength={100}
                  required
                />
              </label>
              <label>
                เบอร์โทรศัพท์ <span>*</span>
                <input
                  name="phone"
                  type="tel"
                  placeholder="08X-XXX-XXXX"
                  pattern="0[0-9]{8,9}"
                  title="เบอร์โทรศัพท์ 9–10 หลัก เริ่มต้นด้วย 0"
                  autoComplete="tel"
                  required
                />
              </label>
              <label>
                วันที่ <span>*</span>
                <input
                  type="date"
                  name="date"
                  min={today}
                  defaultValue={today}
                  required
                />
              </label>
              <label>
                เวลา <span>*</span>
                <select name="time" defaultValue="18:00">
                  {Array.from(
                    {length: 21},
                    (_, i) =>
                      `${11 + Math.floor(i / 2)}:${i % 2 ? '30' : '00'}`,
                  ).map((time) => (
                    <option key={time}>{time}</option>
                  ))}
                </select>
              </label>
              <label>
                จำนวนผู้ร่วมโต๊ะ <span>*</span>
                <select name="guests" defaultValue="2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(
                    (number) => (
                      <option key={number} value={number}>
                        {number} ท่าน
                      </option>
                    ),
                  )}
                </select>
              </label>
              <label>
                สาขา
                <select name="branch">
                  <option>สุขุมวิท · กรุงเทพฯ</option>
                </select>
              </label>
              <label className="full-field">
                หมายเหตุ <small>(ไม่จำเป็น)</small>
                <textarea
                  name="note"
                  placeholder="เช่น มีเด็กเล็กมาด้วย หรือต้องการเก้าอี้เด็ก"
                  maxLength={300}
                  rows={2}
                />
              </label>
            </div>
            <p className="demo-explanation">
              ใช้ข้อมูลจำลอง
              ไม่มีการตรวจสอบโต๊ะว่างหรือส่งการจองไปยังร้าน
            </p>
            <button
              className="button primary full-width"
              type="submit"
            >
              ทดลองจองโต๊ะ <Icon name="arrow" size={18} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
