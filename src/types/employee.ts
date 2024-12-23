export interface Employee {
  name: string;
  serviceNumber: string; // Dienstnummer
  rank: number; // 0-12
  phone: string;
  insuranceId: string;
  email: string; // Added email field
}

export interface TimeClockEntry {
  employeeId: string;
  checkIn: Date;
  checkOut?: Date;
  status: 'active' | 'inactive';
}