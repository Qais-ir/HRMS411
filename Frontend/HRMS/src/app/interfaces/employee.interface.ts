export interface Employee{

  id : number;
  firstName : string;
  lastName : string;
  positionId: number;
  positionName?: string;
  birthdate?: Date;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
  phone?: string;
  managerId?: number | null;
  managerName?: string | null;
  departmentId?: number;
  departmentName?: string;
  salary?: number;
  email?: string;
  userId?: number;
}