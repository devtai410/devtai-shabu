import {useAppSelector} from '@/store';
import {dishes} from '@/data/mock';
import {
  PageHeading,
  EmptyState,
} from '@/components/shabu/Storefront';
import {MenuCard} from '@/components/shabu/MenuCard';

export function Favorite() {
  const ids = useAppSelector((state) =>
    state.wishlist.list.map((item) => item.id),
  );
  const favorites = dishes.filter((dish) =>
    ids.includes(dish.id),
  );
  return (
    <div className="container page-content">
      <PageHeading
        eyebrow="SAVED WITH LOVE"
        title="เมนูโปรดของคุณ"
        description="เก็บความอร่อยที่ชอบ ไว้สำหรับมื้อถัดไป"
      />
      {favorites.length ? (
        <div className="menu-grid">
          {favorites.map((dish) => (
            <MenuCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="heart"
          title="เมนูไหนที่ใช่ เก็บไว้ได้เลย"
          description="แตะหัวใจบนเมนูที่ชอบ แล้วกลับมาเลือกอร่อยได้ง่ายขึ้น"
        />
      )}
    </div>
  );
}
