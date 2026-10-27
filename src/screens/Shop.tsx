import {PageHeading} from '@/components/shabu/Storefront';
import {MenuBrowser} from '@/components/shabu/MenuBrowser';

export function Shop() {
  return (
    <div className="container page-content">
      <PageHeading
        eyebrow="THE devtai MENU"
        title="เมนูโปรด สำหรับหม้อของคุณ"
        description="เลือกวัตถุดิบที่ชอบ แล้วให้มื้อนี้อร่อยในแบบของคุณ"
      />
      <MenuBrowser />
    </div>
  );
}
