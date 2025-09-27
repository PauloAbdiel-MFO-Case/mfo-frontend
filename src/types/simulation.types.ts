export type SimulationListItem = {
  id: number;
  simulationId: number;
  version: number;
  isLatest: boolean;
  simulation: {
    id: number;
    name: string;
  };
};

export type Movement = {
  id: number;
  type: string;
  description: string;
  value: number;
  frequency: string;
  startDate: string;
  endDate: string | null;
};

export type Insurance = {
  id: number;
  name: string;
  startDate: string;
  durationMonths: number;
  monthlyPremium: number;
  insuredValue: number;
};

export type AllocationRecord = {
  id: number;
  allocationId: number;
  value: number;
  date: string;
  allocation: {
    id: number;
    name: string;
    type: string;
  };
};

export type SimulationVersionDetails = {
  id: number;
  version: number;
  startDate: string;
  realInterestRate: number;
  simulation: {
    name: string;
  };
  movements: Movement[];
  insurances: Insurance[];
  allocationRecords: AllocationRecord[];
};