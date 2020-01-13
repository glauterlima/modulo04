import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { user, provider, demand, date } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Contagem registrada',
      template: 'registration',
      context: {
        demand: demand.name,
        provider: provider.name,
        user: user.name,
        date: format(parseISO(date), "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new RegistrationMail();
