// Central TypeScript types for the entire application
export type AcademicLevel = 'CRECHE' | 'NURSERY' | 'PRIMARY' | 'JSS' | 'SSS'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: 'ADMIN' | 'TEACHER' | 'PARENT' | 'STUDENT'
  avatarUrl?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (token: string, user: User) => void
  logout: () => void
}

export interface NewsArticle {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  author: string
  publishedAt: string
  tags: string[]
}

export interface GalleryImage {
  id: number
  title: string
  imageUrl: string
  thumbnailUrl: string
  category: string
  takenAt: string
}

export interface Event {
  id: number
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
  category: string
  imageUrl?: string
  registrationOpen: boolean
}

export interface Announcement {
  id: number
  title: string
  message: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  publishedAt: string
  expiresAt?: string
}

export interface AdmissionApplication {
  id?: number
  applicantFirstName: string
  applicantLastName: string
  dateOfBirth: string
  gender: 'MALE' | 'FEMALE'
  academicLevel: AcademicLevel
  parentFirstName: string
  parentLastName: string
  parentPhone: string
  parentEmail: string
  parentRelationship: string
  address: string
  previousSchool?: string
  howDidYouHear?: string
  termsAccepted: boolean
}

export interface SchoolFee {
  id: number
  academicLevel: AcademicLevel
  termName: string
  academicYear: string
  tuitionFee: number
  developmentLevy: number
  otherFees: number
  totalAmount: number
  currency: string
}

export interface Student {
  id: number
  studentId: string
  firstName: string
  lastName: string
  academicLevel: AcademicLevel
  className: string
  parentEmail: string
  avatarUrl?: string
  enrollmentDate: string
}

export interface Subject {
  id: number
  name: string
  code: string
  teacherName: string
}

export interface Result {
  id: number
  subject: string
  score: number
  grade: string
  term: string
  academicYear: string
}

export interface AttendanceRecord {
  date: string
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED'
}

export interface CalendarItem {
  id: number
  title: string
  date: string
  endDate?: string
  category: 'HOLIDAY' | 'EXAM' | 'EVENT' | 'SPORTS' | 'CULTURAL' | 'MEETING'
  description?: string
}

export interface Testimonial {
  id: number
  name: string
  role: string
  message: string
  avatarUrl?: string
  rating: number
}

export interface Facility {
  id: number
  name: string
  description: string
  icon: string
  imageUrl?: string
}

export interface PaginatedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  currentPage: number
  pageSize: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface NewsletterSubscription {
  email: string
  firstName?: string
}
