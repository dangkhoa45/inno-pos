export interface DiscountOption {
  id: string
  title: string
  desc: string
  label: string
  value: number
  type: 'percent' | 'amount'
  validFrom: string // ISO date string
  validTo: string // ISO date string
  payment: string[] // ['Cash', 'Apple Pay', ...]
  category: string // 'Loại mặt hàng 1', ...
}

export const mockDiscountOptions: DiscountOption[] = [
  {
    id: 'student-5',
    title: 'Student Discount',
    desc: 'Special discount for students',
    label: '5%',
    value: 5,
    type: 'percent',
    validFrom: '2024-06-01',
    validTo: '2024-07-01',
    payment: ['Cash'],
    category: 'Loại mặt hàng 1',
  },
  {
    id: 'member-10',
    title: 'Member Discount',
    desc: 'Discount for loyal members',
    label: '10%',
    value: 10,
    type: 'percent',
    validFrom: '2024-06-10',
    validTo: '2024-08-01',
    payment: ['Cash', 'Apple Pay'],
    category: 'Loại mặt hàng 2',
  },
  {
    id: 'senior-15',
    title: 'Senior Discount',
    desc: 'Discount for senior citizens',
    label: '15%',
    value: 15,
    type: 'percent',
    validFrom: '2024-05-01',
    validTo: '2024-06-30',
    payment: ['Master Card'],
    category: 'Loại mặt hàng 3',
  },
  {
    id: 'vip-20',
    title: 'VIP Discount',
    desc: 'Exclusive discount for VIP customers',
    label: '20%',
    value: 20,
    type: 'percent',
    validFrom: '2024-07-01',
    validTo: '2024-09-01',
    payment: ['Apple Pay'],
    category: 'Loại mặt hàng 4',
  },
  {
    id: 'staff-25',
    title: 'Staff Discount',
    desc: 'Employee discount',
    label: '25%',
    value: 25,
    type: 'percent',
    validFrom: '2024-06-15',
    validTo: '2024-07-15',
    payment: ['Cash', 'Master Card'],
    category: 'Loại mặt hàng 5',
  },
  {
    id: 'bulk-50',
    title: 'Bulk Purchase',
    desc: 'Discount for bulk purchases',
    label: '50%',
    value: 50,
    type: 'percent',
    validFrom: '2024-05-20',
    validTo: '2024-08-20',
    payment: ['Apple Pay', 'Master Card'],
    category: 'Loại mặt hàng 6',
  },
  {
    id: 'coupon-5000',
    title: '5,000 VND Coupon',
    desc: 'Fixed amount discount coupon',
    label: '5,000 VND',
    value: 5000,
    type: 'amount',
    validFrom: '2024-06-01',
    validTo: '2024-07-01',
    payment: ['Cash'],
    category: 'Loại mặt hàng 1',
  },
  {
    id: 'voucher-10000',
    title: '10,000 VND Voucher',
    desc: 'Gift voucher discount',
    label: '10,000 VND',
    value: 10000,
    type: 'amount',
    validFrom: '2024-07-01',
    validTo: '2024-08-01',
    payment: ['Apple Pay'],
    category: 'Loại mặt hàng 2',
  },
  {
    id: 'promo-20000',
    title: '20,000 VND Promo',
    desc: 'Promotional discount',
    label: '20,000 VND',
    value: 20000,
    type: 'amount',
    validFrom: '2024-06-10',
    validTo: '2024-07-20',
    payment: ['Master Card'],
    category: 'Loại mặt hàng 3',
  },
  {
    id: 'special-50000',
    title: '50,000 VND Special',
    desc: 'Special occasion discount',
    label: '50,000 VND',
    value: 50000,
    type: 'amount',
    validFrom: '2024-05-15',
    validTo: '2024-06-15',
    payment: ['Cash', 'Apple Pay'],
    category: 'Loại mặt hàng 4',
  },
  {
    id: 'grand-100000',
    title: '100,000 VND Grand',
    desc: 'Grand opening discount',
    label: '100,000 VND',
    value: 100000,
    type: 'amount',
    validFrom: '2024-06-20',
    validTo: '2024-08-20',
    payment: ['Master Card'],
    category: 'Loại mặt hàng 5',
  },
  // 18 more mock items đa dạng
  ...Array.from({ length: 40 }).map((_, i) => {
    const day = (i % 28) + 1
    const month = ((i % 6) + 5).toString().padStart(2, '0')
    const validFrom = `2024-${month}-${day.toString().padStart(2, '0')}`
    const validTo = `2024-${month}-${(day + 10).toString().padStart(2, '0')}`
    const paymentOptions = [
      ['Cash'],
      ['Apple Pay'],
      ['Master Card'],
      ['Cash', 'Apple Pay'],
      ['Cash', 'Master Card'],
      ['Apple Pay', 'Master Card'],
      ['Cash', 'Apple Pay', 'Master Card'],
    ]
    const categories = [
      'Loại mặt hàng 1',
      'Loại mặt hàng 2',
      'Loại mặt hàng 3',
      'Loại mặt hàng 4',
      'Loại mặt hàng 5',
      'Loại mặt hàng 6',
    ]
    return {
      id: `mock-${i + 1}`,
      title: `Mock Discount ${i + 1}`,
      desc: `Auto-generated discount ${i + 1}`,
      label: i % 2 === 0 ? `${5 + i * 2}%` : `${(i + 1) * 1000} VND`,
      value: i % 2 === 0 ? 5 + i * 2 : (i + 1) * 1000,
      type: (i % 2 === 0 ? 'percent' : 'amount') as 'percent' | 'amount',
      validFrom,
      validTo,
      payment: paymentOptions[i % paymentOptions.length],
      category: categories[i % categories.length],
    }
  }),
]
