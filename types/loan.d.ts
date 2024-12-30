export interface Form {
  id?: number | String;
  transaction_no?: number | String;
  amount: number;
  date: Date;
  loan_percentage: number;
  status?: String;
  agent_id: String;
  agent_percentage: number;
  lead_generator_id: number | string;
  lead_generator_percentage: number;
}
