import type {DishType} from '@/types';

export type MenuCategory =
  | 'all'
  | 'sets'
  | 'beef'
  | 'pork'
  | 'seafood'
  | 'vegetables'
  | 'soup'
  | 'drinks';
export const categories: {
  id: MenuCategory;
  name: string;
  english: string;
  icon: string;
}[] = [
  {
    id: 'all',
    name: 'ทั้งหมด',
    english: 'All menu',
    icon: 'grid',
  },
  {
    id: 'sets',
    name: 'ชุดชาบู',
    english: 'Shabu sets',
    icon: 'pot',
  },
  {
    id: 'beef',
    name: 'เนื้อพรีเมียม',
    english: 'Premium beef',
    icon: 'beef',
  },
  {
    id: 'pork',
    name: 'เนื้อหมู',
    english: 'Pork',
    icon: 'beef',
  },
  {
    id: 'seafood',
    name: 'ซีฟู้ด',
    english: 'Seafood',
    icon: 'shrimp',
  },
  {
    id: 'vegetables',
    name: 'ผักและของทานเล่น',
    english: 'Veggies & sides',
    icon: 'leaf',
  },
  {
    id: 'soup',
    name: 'น้ำซุป',
    english: 'Broths',
    icon: 'pot',
  },
  {
    id: 'drinks',
    name: 'เครื่องดื่ม',
    english: 'Drinks',
    icon: 'cup',
  },
];
export type ShabuDish = DishType & {
  category: MenuCategory;
  english: string;
  sprite?: number;
  badge?: string;
  originalPrice?: number;
  serves?: string;
  allergens: string[];
};
const base = {
  rating: 4.9,
  type: 'food' as const,
  cookingTime: 25,
  isAvailable: true,
  image: '/images/menu-grid.webp',
  allergens: [] as string[],
};
export const dishes: ShabuDish[] = [
  {
    ...base,
    id: 101,
    name: 'เนื้อวากิวสไลซ์',
    english: 'Wagyu Beef',
    description:
      'เนื้อวากิวลายหินอ่อน สไลซ์บางกำลังดี นุ่มละมุนทุกคำ แนะนำให้ลวกในน้ำซุปคอมบุเพื่อสัมผัสรสชาติของเนื้ออย่างเต็มที่',
    price: 259,
    category: 'beef',
    weight: '150 กรัม',
    sprite: 0,
    badge: 'ขายดี',
    isPopular: true,
    isRecommended: true,
    ingredients: ['เนื้อวากิวสไลซ์', 'ใบชิโสะ'],
  },
  {
    ...base,
    id: 102,
    name: 'หมูคุโรบูตะสไลซ์',
    english: 'Kurobuta Pork',
    description:
      'หมูคุโรบูตะคัดพิเศษ เนื้อนุ่ม หอมหวานตามธรรมชาติ อร่อยลงตัวกับน้ำจิ้มงาสูตรเฉพาะของเรา',
    price: 159,
    category: 'pork',
    weight: '150 กรัม',
    sprite: 1,
    badge: 'เชฟแนะนำ',
    isRecommended: true,
    ingredients: ['หมูคุโรบูตะ', 'ใบชิโสะ'],
  },
  {
    ...base,
    id: 103,
    name: 'ชุดชาบูอุ่นใจ',
    english: 'Signature Shabu Set',
    description:
      'ครบความอร่อยในชุดเดียว ทั้งหมูคุโรบูตะ เนื้อสไลซ์ ผักสด เต้าหู้ เส้นอุด้ง พร้อมน้ำซุปและน้ำจิ้ม 2 สูตร สำหรับมื้อพิเศษของคุณ',
    price: 599,
    originalPrice: 699,
    category: 'sets',
    weight: 'ชุดสำหรับ 2 คน',
    image: '/images/shabu-hero.webp',
    badge: 'ประหยัด ฿100',
    isRecommended: true,
    isPopular: true,
    serves: '2 คน',
    ingredients: [
      'หมูคุโรบูตะ 150 กรัม',
      'เนื้อสไลซ์ 150 กรัม',
      'ชุดผักรวม',
      'เต้าหู้',
      'เส้นอุด้ง',
      'น้ำซุปคอมบุ',
      'น้ำจิ้มพอนสึและงา',
    ],
    allergens: ['ถั่วเหลือง', 'งา', 'กลูเตน'],
  },
  {
    ...base,
    id: 104,
    name: 'ซีฟู้ดรวมทะเล',
    english: 'Seafood Platter',
    description:
      'ยกทะเลมาไว้ในหม้อกับกุ้งสด ปลาหมึก และหอยแมลงภู่ คัดความสดใหม่ให้ทุกมื้อพิเศษ',
    price: 289,
    category: 'seafood',
    weight: '250 กรัม',
    sprite: 2,
    badge: 'สดใหม่ทุกวัน',
    isRecommended: true,
    ingredients: ['กุ้ง', 'ปลาหมึก', 'หอยแมลงภู่', 'เลมอน'],
    allergens: ['สัตว์น้ำเปลือกแข็ง', 'หอย'],
  },
  {
    ...base,
    id: 105,
    name: 'ชุดผักสดสวนญี่ปุ่น',
    english: 'Garden Vegetable Set',
    description:
      'ผักกาดขาว ผักกวางตุ้ง เห็ดหอม เห็ดเข็มทอง แครอต และเต้าหู้ ความสดกรอบที่ขาดไม่ได้ในทุกหม้อ',
    price: 129,
    category: 'vegetables',
    weight: '300 กรัม',
    sprite: 3,
    isPopular: true,
    ingredients: [
      'ผักกาดขาว',
      'ผักกวางตุ้ง',
      'เห็ดหอม',
      'เห็ดเข็มทอง',
      'แครอต',
      'เต้าหู้',
    ],
    allergens: ['ถั่วเหลือง'],
  },
  {
    ...base,
    id: 106,
    name: 'น้ำซุปสุกี้ยากี้',
    english: 'Sukiyaki Broth',
    description:
      'น้ำซุปสไตล์ญี่ปุ่น หอมโชยุ รสหวานเค็มกลมกล่อม เคี่ยวอย่างพิถีพิถัน จับคู่กับเนื้อวากิวได้อย่างลงตัว',
    price: 89,
    category: 'soup',
    weight: '1,000 มล.',
    sprite: 4,
    ingredients: ['โชยุ', 'คอมบุ', 'เห็ดหอม'],
    allergens: ['ถั่วเหลือง', 'กลูเตน'],
  },
  {
    ...base,
    id: 107,
    name: 'มัทฉะและยูซุโซดา',
    english: 'Matcha & Yuzu Pair',
    description:
      'แพ็กคู่ความสดชื่น ชาเขียวมัทฉะหอมละมุนและยูซุโซดารสเปรี้ยวหวาน ตัดรสชาบูได้พอดี',
    price: 119,
    category: 'drinks',
    type: 'drink',
    weight: '2 แก้ว / 350 มล.',
    sprite: 5,
    ingredients: ['ชาเขียวมัทฉะ', 'ยูซุ', 'โซดา'],
  },
  {
    ...base,
    id: 108,
    name: 'ชุดชาบูพร้อมหน้า',
    english: 'Family Shabu Set',
    description:
      'ความสุขหม้อใหญ่สำหรับทั้งครอบครัว รวมเนื้อวากิว หมูคุโรบูตะ ซีฟู้ด ชุดผัก และน้ำซุป 2 รส พร้อมน้ำจิ้มครบชุด',
    price: 1099,
    originalPrice: 1299,
    category: 'sets',
    weight: 'ชุดสำหรับ 4 คน',
    image: '/images/shabu-hero.webp',
    badge: 'คุ้มสำหรับครอบครัว',
    serves: '4 คน',
    ingredients: [
      'เนื้อวากิว',
      'หมูคุโรบูตะ',
      'ซีฟู้ดรวม',
      'ชุดผักรวม',
      'น้ำซุป 2 รส',
      'น้ำจิ้ม 2 สูตร',
    ],
    allergens: [
      'ถั่วเหลือง',
      'งา',
      'กลูเตน',
      'สัตว์น้ำเปลือกแข็ง',
      'หอย',
    ],
  },
  {
    ...base,
    id: 109,
    name: 'เนื้อสันคอสไลซ์',
    english: 'Beef Chuck Roll',
    description:
      'เนื้อสันคอคัดคุณภาพ สไลซ์บางนุ่มกำลังดี รสชาติเนื้อเข้มข้น เหมาะกับทุกน้ำซุป',
    price: 189,
    category: 'beef',
    weight: '150 กรัม',
    sprite: 0,
    ingredients: ['เนื้อสันคอสไลซ์'],
  },
  {
    ...base,
    id: 110,
    name: 'หมูสามชั้นสไลซ์',
    english: 'Pork Belly',
    description:
      'หมูสามชั้นสไลซ์บาง ชั้นเนื้อและไขมันสมดุล ลวกแล้วนุ่มฉ่ำ จิ้มน้ำจิ้มพอนสึเพิ่มความสดชื่น',
    price: 129,
    category: 'pork',
    weight: '150 กรัม',
    sprite: 1,
    ingredients: ['หมูสามชั้นสไลซ์'],
  },
  {
    ...base,
    id: 111,
    name: 'น้ำซุปคอมบุ',
    english: 'Kombu Dashi Broth',
    description:
      'น้ำซุปใสจากสาหร่ายคอมบุ รสอูมามิอ่อนละมุน ช่วยชูรสชาติของวัตถุดิบโดยไม่กลบความหวานธรรมชาติ',
    price: 69,
    category: 'soup',
    weight: '1,000 มล.',
    sprite: 4,
    ingredients: ['สาหร่ายคอมบุ', 'เห็ดหอม'],
  },
  {
    ...base,
    id: 112,
    name: 'ผักและเห็ดรวมพิเศษ',
    english: 'Mushroom Garden',
    description:
      'ผักกรอบและเห็ดหลากชนิด พร้อมเต้าหู้เนื้อนุ่ม เติมความสมดุลและรสหวานให้หม้อชาบู',
    price: 99,
    category: 'vegetables',
    weight: '200 กรัม',
    sprite: 3,
    ingredients: [
      'เห็ดหอม',
      'เห็ดเข็มทอง',
      'ผักกวางตุ้ง',
      'เต้าหู้',
    ],
    allergens: ['ถั่วเหลือง'],
  },
];
export const money = (amount: number) =>
  `฿${amount.toLocaleString('th-TH', {maximumFractionDigits: 2})}`;
export const categoryName = (category: string) =>
  categories.find((item) => item.id === category)?.name ??
  'เมนูอาหาร';
