import * as React from "react";
import Colors from "../../styles/Colors.ts";

const Footer: React.FC = () => (
    <footer style={{ backgroundColor: Colors.colorBrand4, color: Colors.grey10, padding: '20px 0', textAlign: 'center' }}>
        <p>Contato: contato@freelancersita.com | (XX) XXXX-XXXX</p>
        <p>© 2025 Freelancers Itabaiana. Todos os direitos reservados.</p>
    </footer>
)

export default Footer;