export interface DiscountOption {
  id: string
  title: string
  desc: string
  label: string
  value: number
  type: 'percent' | 'amount'
}

export const mockDiscountOptions: DiscountOption[] = [
  {
    id: 'student-5',
    title: 'Student Discount',
    desc: 'Special discount for students',
    label: '5%',
    value: 5,
    type: 'percent',
  },
  {
    id: 'member-10',
    title: 'Member Discount',
    desc: 'Discount for loyal members',
    label: '10%',
    value: 10,
    type: 'percent',
  },
  {
    id: 'senior-15',
    title: 'Senior Discount',
    desc: 'Discount for senior citizens',
    label: '15%',
    value: 15,
    type: 'percent',
  },
  {
    id: 'vip-20',
    title: 'VIP Discount',
    desc: 'Exclusive discount for VIP customers',
    label: '20%',
    value: 20,
    type: 'percent',
  },
  {
    id: 'staff-25',
    title: 'Staff Discount',
    desc: 'Employee discount',
    label: '25%',
    value: 25,
    type: 'percent',
  },
  {
    id: 'bulk-50',
    title: 'Bulk Purchase',
    desc: 'Discount for bulk purchases',
    label: '50%',
    value: 50,
    type: 'percent',
  },
  {
    id: 'coupon-5000',
    title: '5,000 VND Coupon',
    desc: 'Fixed amount discount coupon',
    label: '5,000 VND',
    value: 5000,
    type: 'amount',
  },
  {
    id: 'voucher-10000',
    title: '10,000 VND Voucher',
    desc: 'Gift voucher discount',
    label: '10,000 VND',
    value: 10000,
    type: 'amount',
  },
  {
    id: 'promo-20000',
    title: '20,000 VND Promo',
    desc: 'Promotional discount',
    label: '20,000 VND',
    value: 20000,
    type: 'amount',
  },
  {
    id: 'special-50000',
    title: '50,000 VND Special',
    desc: 'Special occasion discount',
    label: '50,000 VND',
    value: 50000,
    type: 'amount',
  },
  {
    id: 'grand-100000',
    title: '100,000 VND Grand',
    desc: 'Grand opening discount',
    label: '100,000 VND',
    value: 100000,
    type: 'amount',
  },
]
