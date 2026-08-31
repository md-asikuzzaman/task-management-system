import type { IconType } from "react-icons";

interface Props {
  count: number;
  title: string;
  icon: IconType;
  style?: string;
}

const InfoCard = ({ count, title, icon: Icon, style }: Props) => {
  return (
    <div
      className={`rounded-xl border border-neutral-200 bg-white p-2 md:p-3 lg:p-4 flex items-center gap-4`}
    >
      <div className={`rounded-full p-3 ${style}`}>
        {<Icon className="size-5" />}
      </div>
      <div className="">
        <p className="heading-card">{count}</p>
        <h2 className="paragraph-muted">{title}</h2>
      </div>
    </div>
  );
};

export default InfoCard;
