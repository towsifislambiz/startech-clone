import {
  FiTruck, FiCreditCard, FiHeadphones, FiRefreshCw
} from 'react-icons/fi';
import {
  BsPcDisplay, BsLaptop, BsCpu, BsDisplay, BsBatteryCharging,
  BsPhone, BsTablet, BsCamera, BsShieldLock, BsWifi,
  BsHeadphones, BsSmartwatch, BsMotherboard, BsGpuCard,
  BsMemory, BsDeviceHdd, BsKeyboard, BsMouse, BsSpeaker
} from 'react-icons/bs';

export const SITE_NAME = 'StarTech';
export const CURRENCY_SYMBOL = '৳';
export const HOTLINE_NUMBER = '16793';
export const SUPPORT_EMAIL = 'support@startech.com.bd';

export const CATEGORY_NAMES = {
  1: 'Desktop', 2: 'Laptop', 3: 'Component', 4: 'Monitor', 5: 'UPS & Power',
  6: 'Phone', 7: 'Tablet', 8: 'Camera', 9: 'Security', 10: 'Networking',
  11: 'Accessories', 12: 'Gadget',
};

export const NAV_CATEGORIES = [
  { id: 1, name: 'Desktop' },
  { id: 2, name: 'Laptop' },
  { id: 3, name: 'Component' },
  { id: 4, name: 'Monitor' },
  { id: 5, name: 'UPS' },
  { id: 6, name: 'Phone' },
  { id: 7, name: 'Tablet' },
  { id: 8, name: 'Camera' },
  { id: 9, name: 'Security' },
  { id: 10, name: 'Networking' },
  { id: 11, name: 'Accessories' },
  { id: 12, name: 'Gadget' },
];

export const SIDEBAR_CATEGORIES = [
  { id: 1, name: 'Desktop', icon: BsPcDisplay },
  { id: 2, name: 'Laptop', icon: BsLaptop },
  { id: 3, name: 'Component', icon: BsCpu },
  { id: 4, name: 'Monitor', icon: BsDisplay },
  { id: 5, name: 'UPS & Power', icon: BsBatteryCharging },
  { id: 6, name: 'Phone', icon: BsPhone },
  { id: 7, name: 'Tablet', icon: BsTablet },
  { id: 8, name: 'Camera', icon: BsCamera },
  { id: 9, name: 'Security', icon: BsShieldLock },
  { id: 10, name: 'Networking', icon: BsWifi },
  { id: 11, name: 'Accessories', icon: BsHeadphones },
  { id: 12, name: 'Gadget', icon: BsSmartwatch },
];

export const SERVICES = [
  { icon: FiTruck, title: 'Fast Delivery', subtitle: 'All over Bangladesh' },
  { icon: FiCreditCard, title: 'Easy Payment', subtitle: 'bKash, Nagad, Card' },
  { icon: FiRefreshCw, title: '7 Days Return', subtitle: 'Easy exchange policy' },
  { icon: FiHeadphones, title: '24/7 Support', subtitle: 'Dedicated helpline' },
];

export const FEATURED_CATEGORIES = [
  { id: 1, name: 'Desktop', icon: BsPcDisplay },
  { id: 2, name: 'Laptop', icon: BsLaptop },
  { id: 3, name: 'Processor', icon: BsCpu },
  { id: 4, name: 'Graphics Card', icon: BsGpuCard },
  { id: 5, name: 'Motherboard', icon: BsMotherboard },
  { id: 6, name: 'RAM', icon: BsMemory },
  { id: 7, name: 'Storage', icon: BsDeviceHdd },
  { id: 8, name: 'Monitor', icon: BsDisplay },
  { id: 9, name: 'Keyboard', icon: BsKeyboard },
  { id: 10, name: 'Mouse', icon: BsMouse },
  { id: 11, name: 'Headphone', icon: BsHeadphones },
  { id: 12, name: 'Speaker', icon: BsSpeaker },
];

export const BRANDS = ['ASUS', 'Intel', 'AMD', 'MSI', 'Gigabyte', 'Samsung', 'Corsair', 'Logitech', 'Razer', 'Apple', 'Sony', 'LG', 'NZXT'];

export const PRICE_RANGES = [
  { label: 'Under ৳20,000', min: 0, max: 20000 },
  { label: '৳20,000 - ৳50,000', min: 20000, max: 50000 },
  { label: '৳50,000 - ৳100,000', min: 50000, max: 100000 },
  { label: 'Above ৳100,000', min: 100000, max: Infinity },
];
