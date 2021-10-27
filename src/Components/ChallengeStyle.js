import styled from "styled-components";

const ChallengeDiv = styled.div`
  background-color: var(--color-white);
  height: 100%;
  font-family: var(--libre);

  .title {
    font-family: var(--lora);
    font-weight: 400;
    font-size: 2.5rem;
    color: var(--color-brown);
    text-align: center;
    padding: 1rem;
    margin: 0;
  }

  .table {
    width: 90%;
    margin: auto;
  }

  .customer-badge {
    text-transform: uppercase;
    padding: 0.25em 0.5rem;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.3px;
  }

  .status-general {
    background-color: #c8e6c9;
    color: #256029;
  }

  .status-ca-pg {
    background-color: #feedaf;
    color: #8a5340;
  }

  .status-14-accompaniment {
    background-color: #ffcdd2;
    color: #c63737;
  }

  .green-box {
    background-color: #88a2aa;
  }
`;

export default ChallengeDiv;
