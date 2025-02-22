export interface iEvent {
  title: string;
  start: string;
  end: string;
  color?: string;
  booked: boolean;
  classNames: string[];
  extendedProps: { customTooltip: string };
}
