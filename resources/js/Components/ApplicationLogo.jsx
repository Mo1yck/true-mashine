export default function ApplicationLogo({ className }) {
    return (
        <img
            src="/images/logo.png" // путь к твоему логотипу в папке public/images/
            alt="TrueMachine"
            className={className}
        />
    );
}
