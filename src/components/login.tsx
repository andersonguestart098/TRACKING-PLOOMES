import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { signIn, signOut } from "next-auth/react";
import React, { useState } from "react";

// Componente do modal
const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Section = styled.section`
  background-image: url("/icones/backGround01.jpg");
  background-size: cover; /* Ajusta o tamanho da imagem para cobrir toda a seção */
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Section>
      <Button
        onClick={toggleModal}
        variant="contained"
        size="large"
        color="success"
      >
        FAZER LOGIN
      </Button>
      {isOpen && (
        <Modal>
          <div style={{ display: "flex", gap: "10px" }}>
            <h2>Efetue o login:</h2>
            <Button onClick={() => signIn("github")} variant="contained">
              LOGIN
            </Button>
            <Button onClick={toggleModal} variant="outlined">
              Fechar
            </Button>
          </div>
        </Modal>
      )}
    </Section>
  );
};

export default ModalSection;
