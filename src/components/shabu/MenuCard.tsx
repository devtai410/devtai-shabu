import type {CSSProperties} from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@/store';
import {cartActions} from '@/store/cartSlice';
import {wishlistActions} from '@/store/wishlistSlice';
import {dishes, money, type ShabuDish} from '@/data/mock';
import type {DishType} from '@/types';
import {Icon} from './Icon';
import {useToast} from './Storefront';

export function FoodImage({
  dish,
  className = '',
}: {
  dish: DishType;
  className?: string;
}) {
  const menuDish = dishes.find(
    (item) => item.id === dish.id,
  );
  const sprite = menuDish?.sprite;
  const style: CSSProperties =
    sprite !== undefined
      ? {
          backgroundImage: 'url(/images/menu-grid.webp)',
          backgroundSize: '300% 200%',
          backgroundPosition: `${(sprite % 3) * 50}% ${Math.floor(sprite / 3) * 100}%`,
        }
      : {backgroundImage: `url(${dish.image})`};
  return (
    <div
      className={`food-image ${className}`}
      style={style}
      role="img"
      aria-label={dish.name}
    />
  );
}
export function QuantityControl({
  dish,
  quantity,
}: {
  dish: DishType;
  quantity: number;
}) {
  const dispatch = useAppDispatch();
  return (
    <div
      className="quantity-control"
      aria-label={`จำนวน ${dish.name}`}
    >
      <button
        type="button"
        aria-label={`ลด ${dish.name}`}
        onClick={() =>
          dispatch(cartActions.removeFromCart(dish))
        }
      >
        <Icon name="minus" size={16} />
      </button>
      <span aria-live="polite">{quantity}</span>
      <button
        type="button"
        aria-label={`เพิ่ม ${dish.name}`}
        onClick={() =>
          dispatch(cartActions.addToCart(dish))
        }
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
export function MenuCard({dish}: {dish: ShabuDish}) {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const liked = useAppSelector((state) =>
    state.wishlist.list.some((item) => item.id === dish.id),
  );
  const quantity = useAppSelector(
    (state) =>
      state.cart.list.find((item) => item.id === dish.id)
        ?.quantity ?? 0,
  );
  return (
    <article className="menu-card">
      <div className="menu-card-image">
        <Link
          to={`/dish-description/${dish.id}`}
          tabIndex={-1}
          aria-hidden="true"
        >
          <FoodImage dish={dish} />
        </Link>
        {dish.badge && (
          <span
            className={`dish-badge ${dish.category === 'sets' ? 'badge-red' : ''}`}
          >
            {dish.badge === 'ขายดี' && (
              <Icon name="star" size={12} />
            )}{' '}
            {dish.badge}
          </span>
        )}
        <button
          className={`favorite-button ${liked ? 'liked' : ''}`}
          aria-label={`${liked ? 'นำออกจาก' : 'เพิ่ม'}รายการโปรด ${dish.name}`}
          aria-pressed={liked}
          onClick={() => {
            dispatch(
              liked
                ? wishlistActions.removeFromWishlist(dish)
                : wishlistActions.addToWishlist(dish),
            );
            toast(
              liked
                ? 'นำเมนูออกจากรายการโปรดแล้ว'
                : 'เก็บเมนูโปรดของคุณแล้ว',
            );
          }}
        >
          <Icon name="heart" size={18} />
        </button>
      </div>
      <div className="menu-card-body">
        <div className="menu-card-meta">
          <span>{dish.english}</span>
          <span>
            <Icon name="star" size={12} />
            {dish.rating}
          </span>
        </div>
        <Link
          className="dish-title"
          to={`/dish-description/${dish.id}`}
        >
          <h3>{dish.name}</h3>
        </Link>
        <p className="dish-weight">{dish.weight}</p>
        <div className="card-price-row">
          <div className="price">
            {money(dish.price)}
            {dish.originalPrice && (
              <del>{money(dish.originalPrice)}</del>
            )}
          </div>
          {quantity > 0 ? (
            <QuantityControl
              dish={dish}
              quantity={quantity}
            />
          ) : (
            <button
              className="add-button"
              onClick={() => {
                dispatch(cartActions.addToCart(dish));
                toast(`เพิ่ม${dish.name}ลงตะกร้าแล้ว`);
              }}
              aria-label={`เพิ่ม ${dish.name} ลงตะกร้า`}
            >
              <Icon name="plus" size={18} />
              <span>เพิ่ม</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
