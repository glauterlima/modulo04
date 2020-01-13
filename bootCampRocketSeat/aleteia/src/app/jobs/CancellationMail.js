import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { count } = data;

    await Mail.sendMail({
      to: `${count.provider.name} <${count.provider.email}>`,
      subject: 'Contagem cancelada',
      template: 'cancellation',
      context: {
        demand: count.demand.name,
        provider: count.provider.name,
        user: count.user.name,
        date: format(
          parseISO(count.canceled_at),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
