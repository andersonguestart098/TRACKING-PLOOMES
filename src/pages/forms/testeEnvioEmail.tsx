import { useForm } from "react-hook-form";

const MeuComponente = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/methodsdatabase/enviarEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("E-mail enviado com sucesso!");
      } else {
        alert("Erro ao enviar e-mail. Por favor, tente novamente mais tarde.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar e-mail. Por favor, tente novamente mais tarde.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("to")} type="email" placeholder="Para" required />
      <input
        {...register("subject")}
        type="text"
        placeholder="Assunto"
        required
      />
      <textarea {...register("text")} placeholder="Mensagem" required />
      <button type="submit">Enviar E-mail</button>
    </form>
  );
};

export default MeuComponente;
