type Props = {
  size?: number;
  className?: string;
};

const Loading: React.FC<Props> = ({ className, ...props }) => (
  <div
    className={className}
    style={{
      display: "block",
      margin: "0 auto",
      fontSize: `${props.size}px`,
    }}
  >
    Loading...
  </div>
);

export default Loading;
