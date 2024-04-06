import { prisma } from '../src/lib/prisma'
import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'

async function seed() {
  const eventId = '9e9bd979-9d10-4915-b339-3786b1634f33'

  await prisma.event.deleteMany()

  await prisma.event.create({
    data: {
      id: eventId,
      title: 'Conferência Global de Inovação em Tecnologia 2024',
      slug: 'conferencia-global-inovacao-tecnologia-2024',
      details:
        'A Conferência Global de Inovação em Tecnologia é um evento de destaque no cenário internacional, reunindo os principais líderes, visionários e especialistas do setor de tecnologia para explorar as últimas tendências e avanços no campo da inovação. Com palestras inspiradoras, painéis de discussão interativos, sessões práticas e oportunidades de networking, esta conferência proporciona uma plataforma única para compartilhar conhecimentos, colaborar em projetos e impulsionar o progresso da indústria de tecnologia em escala global.',
      maximumAttendees: 120,
    },
  })

  const attendeesToInsert: Prisma.AttendeeUncheckedCreateInput[] = []

  for (let i = 0; i <= 120; i++) {
    attendeesToInsert.push({
      id: 10000 + i,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      eventId,
      createdAt: faker.date.recent({
        days: 30,
        refDate: dayjs().subtract(8, 'days').toDate(),
      }),
      CheckIn: faker.helpers.arrayElement<
        Prisma.CheckInUncheckedCreateNestedOneWithoutAttendeeInput | undefined
      >([
        undefined,
        {
          create: {
            createdAt: faker.date.recent({ days: 7 }),
          },
        },
      ]),
    })
  }

  await Promise.all(
    attendeesToInsert.map((data) => {
      return prisma.attendee.create({
        data,
      })
    }),
  )
}

seed().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()
})
