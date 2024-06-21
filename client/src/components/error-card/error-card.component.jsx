import "./error-card.styles.css";

const ErrorCard = ({ message, onClick }) => {
  return (
    <div>
      <h2 style={{ fontWeight: 500 }}>{message}</h2>
      <button onClick={() => onClick()} className="form-submit">
        Back to Saftey
      </button>
    </div>
  );
};

export default ErrorCard;
