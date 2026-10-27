import {useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@/store';
import {cartActions} from '@/store/cartSlice';
import {wishlistActions} from '@/store/wishlistSlice';
import {useGetDish} from '@/hooks/useGetDish';
import {dishes, money, categoryName} from '@/data/mock';
import {
  FoodImage,
  MenuCard,
} from '@/components/shabu/MenuCard';
import {
  EmptyState,
  useToast,
} from '@/components/shabu/Storefront';
import {Icon} from '@/components/shabu/Icon';

export function DishDescription() {
  const {id} = useParams();
  const {dish} = useGetDish(Number(id));
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);
  const liked = useAppSelector((state) =>
    state.wishlist.list.some(
      (item) => item.id === Number(id),
    ),
  );
  if (!dish)
    return (
      <EmptyState
        icon="pot"
        title="ไม่พบเมนูนี้"
        description="เลือกดูเมนูอร่อยอื่น ๆ ของเราได้เลย"
      />
    );
  return (
    <div className="container page-content">
      <div className="breadcrumb">
        <Link to="/shop">เมนูอาหาร</Link>
        <Icon name="chevron" size={14} />
        <Link to={`/shop?category=${dish.category}`}>
          {categoryName(dish.category)}
        </Link>
        <Icon name="chevron" size={14} />
        <span>{dish.name}</span>
      </div>
      <div className="dish-detail">
        <div className="detail-image">
          <FoodImage dish={dish} />
          {dish.badge && (
            <span className="dish-badge badge-red">
              {dish.badge}
            </span>
          )}
        </div>
        <div className="detail-copy">
          <p className="eyebrow">
            {dish.english.toUpperCase()}
          </p>
          <h1>{dish.name}</h1>
          <div className="detail-meta">
            <span className="rating">
              <Icon name="star" size={17} />
              {dish.rating}
            </span>
            <span>{dish.weight}</span>
            <span className="green-label">พร้อมเสิร์ฟ</span>
          </div>
          <p className="detail-description">
            {dish.description}
          </p>
          <div className="detail-price price">
            {money(dish.price)}
            {dish.originalPrice && (
              <del>{money(dish.originalPrice)}</del>
            )}
          </div>
          <div className="ingredient-list">
            <h3>ความอร่อยที่คุณจะได้รับ</h3>
            <ul>
              {dish.ingredients?.map((item) => (
                <li key={item}>
                  <Icon name="check" size={15} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {dish.allergens.length > 0 && (
            <p className="allergen-note">
              ข้อมูลผู้แพ้อาหาร: {dish.allergens.join(', ')}
            </p>
          )}
          <div className="detail-add-row">
            <div className="quantity-control">
              <button
                aria-label="ลดจำนวน"
                disabled={quantity === 1}
                onClick={() =>
                  setQuantity((value) =>
                    Math.max(1, value - 1),
                  )
                }
              >
                <Icon name="minus" size={18} />
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                aria-label="เพิ่มจำนวน"
                onClick={() =>
                  setQuantity((value) => value + 1)
                }
              >
                <Icon name="plus" size={18} />
              </button>
            </div>
            <button
              className="button primary"
              onClick={() => {
                for (let i = 0; i < quantity; i++)
                  dispatch(cartActions.addToCart(dish));
                toast(
                  `เพิ่ม${dish.name} ${quantity} รายการแล้ว`,
                );
              }}
            >
              <Icon name="bag" size={19} />
              เพิ่มลงตะกร้า{' '}
              <span>{money(dish.price * quantity)}</span>
            </button>
            <button
              className={`button secondary detail-favorite ${liked ? 'liked' : ''}`}
              aria-label={
                liked
                  ? 'นำออกจากรายการโปรด'
                  : 'เพิ่มรายการโปรด'
              }
              aria-pressed={liked}
              onClick={() => {
                dispatch(
                  liked
                    ? wishlistActions.removeFromWishlist(
                        dish,
                      )
                    : wishlistActions.addToWishlist(dish),
                );
                toast(
                  liked
                    ? 'นำออกจากรายการโปรดแล้ว'
                    : 'เก็บเมนูโปรดแล้ว',
                );
              }}
            >
              <Icon name="heart" />
            </button>
          </div>
          <p className="detail-delivery">
            <Icon name="truck" size={17} />
            จัดส่งใน 30–45 นาที · ส่งฟรีเมื่อครบ ฿999
          </p>
          <p className="small muted">
            ภาพและรายละเอียดเมนูใช้สำหรับสาธิตหน้าร้าน
          </p>
        </div>
      </div>
      <section className="related-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PERFECT TOGETHER</p>
            <h2>เติมหม้อนี้ให้อร่อยยิ่งขึ้น</h2>
          </div>
        </div>
        <div className="menu-grid">
          {dishes
            .filter((item) => item.id !== dish.id)
            .slice(0, 4)
            .map((item) => (
              <MenuCard key={item.id} dish={item} />
            ))}
        </div>
      </section>
    </div>
  );
}
