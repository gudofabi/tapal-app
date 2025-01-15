export interface Form {
  id?: number | String;
  transaction_no?: number | String;
  amount?: number | null;
  date: Date;
  loan_percentage?: number | null;
  status?: String;
  agent?:
    | {
        id: number | String | any;
        name: String;
        role: String;
        contact_no: String;
        email: String;
      }
    | any;
  agent_id: number | String | any;
  agent_percentage?: number | null;
  lead_generator?:
    | {
        id: number | String | any;
        name: String;
        role: String;
        contact_no: String;
        email: String;
      }
    | any;
  lead_generator_id: number | string | any;
  lead_generator_percentage?: number | null;
}
