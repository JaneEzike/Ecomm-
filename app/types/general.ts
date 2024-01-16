export interface IInput {
  size: any;
  className?: string;
  isPassword?: boolean;
  fullWidth: boolean;
  LabelText: string;
  variant: any;
  onBlur: any;
  onChange: any;
  value: any;
  type: "number" | "text" | "password" | "email";
}
