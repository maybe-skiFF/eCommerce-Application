import { HeaderWrapper } from 'src/components/HeaderWrapper/HeaderWrapper';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Link,
} from '@mui/material';

export function AboutPage() {
  const team = [
    {
      name: 'Albert',
      lastName: 'Bukharmetsyeu',
      role: 'Front-end developer',
      bio: 'Hello, my name is Albert Bukharmetev. I am from Belarus, and recently I turned thirty years old. I studied at Polotsk State University, majoring in Industrial and Civil Engineering. After university, I worked in the construction industry as a site supervisor for several years. Currently, I work as a design engineer at a project organization in the Soligorsk.',
      photo: 'src/assets/image/albert.JPG',
      github: 'https://github.com/xsoularisx',
    },
    {
      name: 'Name1',
      lastName: 'LastName1',
      role: 'Front-end developer',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
      photo: 'src/assets/image/albert.JPG',
      github: 'https://github.com/xsoularisx',
    },
    {
      name: 'Aleksandra',
      lastName: 'Ilchenko',
      role: 'Front-end developer',
      bio: 'Previous jobs are indirectly related to the IT field, but having worked in different directions, I understand that you can always try something new, gaining experience and skills. I consider patience and discipline to be one of my main qualities. After all, having them you can learn anything. Therefore, I know that I can become an experienced web developer. I am attracted to this area by the large IT community and the need for constant development.',
      photo: 'src/assets/image/Aleksandra.JPG',
      github: 'https://github.com/Aleksa013',
    },
  ];
  return (
    <HeaderWrapper>
      <Box sx={{ padding: '0 10px' }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            margin: '20px 0',
            color: 'hsl(210, 100%, 42%)',
          }}
        >
          About us
        </Typography>
        <Box>
          <Typography variant="h4" sx={{ color: 'hsl(215, 15%, 50%)' }}>
            Our Development Team:
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '10px' }}>
            I would like to present to you our startup team of developers who
            worked on creating an online clothing store based on the
            commercetools platform.
          </Typography>
          <Box>
            <Typography variant="h5" sx={{ color: 'hsl(215, 15%, 50%)' }}>
              Team Leadership:
            </Typography>
            <Typography variant="h6" sx={{ color: 'hsl(210, 100%, 42%)' }}>
              Natalia
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              Our mentor, experienced frontend specialist working on real
              projects. Her technical expertise, feedback, training materials,
              and ideas have helped us ensure that our code meets modern
              development standards.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5" sx={{ color: 'hsl(215, 15%, 50%)' }}>
              Core Development Team
            </Typography>
            <Typography variant="h6" sx={{ color: 'hsl(210, 100%, 42%)' }}>
              Denis:
            </Typography>
            <Typography variant="body1">
              Team lead, responsible for the overall application architecture,
              routing, and implementation of the product card functionality. His
              understanding of the technologies, leadership qualities, and
              ability to effectively coordinate the teams work were
              indispensable.
            </Typography>

            <Typography variant="h6" sx={{ color: 'hsl(210, 100%, 42%)' }}>
              Albert:
            </Typography>
            <Typography variant="body1">
              Focused on developing the product catalog and the overall design
              of the online store. His creative approach, attention to detail,
              and ability to find optimal solutions allowed us to create a
              visually appealing and user-friendly interface.
            </Typography>

            <Typography variant="h6" sx={{ color: 'hsl(210, 100%, 42%)' }}>
              Aleksandra:
            </Typography>
            <Typography variant="body1">
              Responsible for implementing the user registration and
              authentication process on the platform. Her attention to detail
              and ability to quickly find solutions to problems were invaluable
              for the successful completion of this key task.
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{ marginTop: '10px', color: 'hsl(215, 15%, 50%)' }}
            >
              Project Tooling and Collaboration
            </Typography>
            <Typography variant="body1">
              To ensure high-quality code and effective collaboration, we used
              advanced tools and methodologies such as Prettier, ESLint, and
              Husky for automating code formatting and verification. The project
              was built using Vite and the React framework, with Material UI
              serving as the foundation for the design. We also used Jira and
              regular Discord meetings for task management and collaboration.
              Thanks to the coordinated work, open exchange of ideas, and mutual
              support of each team member, we were able to create a successful
              online store that meets all (almost all) of the requirements of
              the technical specification. We are proud of our product and are
              pleased to have the opportunity to present it to you.
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h4"
              sx={{ marginTop: '10px', color: 'hsl(215, 15%, 50%)' }}
            >
              We express our gratitude
            </Typography>
            <Typography>
              We would also like to express our sincere gratitude to the RS
              School for providing us with the platform to learn and hone our
              skills as front-end developers. The comprehensive training program
              and hands-on experience have been invaluable in preparing us for
              real-world project development. We are grateful for the
              opportunity to apply our newfound knowledge and expertise to this
              exciting project.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link
            sx={{
              textDecoration: 'none',
              color: '#000000',
              display: 'flex',
              backgroundImage: `url('src/assets/image/logo-rsschool.png')`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              margin: '20px 10px',
              width: '150px',
              minHeight: '50px',
            }}
            target="blank"
            href="https://rs.school/"
          ></Link>
          <Typography variant="h6" sx={{ fontWeight: '600' }}>
            {' '}
            - Free courses. High motivation
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: '40px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            width: '100%',
            '@media (max-width: 1023px)': {
              justifyContent: 'center',
            },
          }}
        >
          {team.map(member => (
            <Card
              key={member.name + member.lastName}
              sx={{
                width: '400px',
                height: '800px',
                border: '1px solid #ebedf0',
                marginBottom: '40px',
                boxSizing: 'border-box',
                cursor: 'pointer',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                },
                '@media (max-width: 426px)': {
                  width: '100%',
                },
              }}
            >
              <CardMedia
                component="div"
                image={member.photo}
                sx={{
                  width: '100%',
                  height: '400px',
                  boxSizing: 'border-box',
                  border: '1px solid #ebedf0',
                  padding: '0',
                  backgroundSize: 'cover',
                }}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    marginBottom: '10px',
                    fontWeight: '500',
                    color: 'hsl(210, 100%, 42%)',
                  }}
                >
                  {member.name} {member.lastName}
                </Typography>
                <Typography variant="body1" sx={{ height: '40px' }}>
                  {member.role}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'hsl(215, 15%, 50%)', height: '240px' }}
                >
                  {member.bio}
                </Typography>
                <Button
                  href={member.github}
                  target="_blank"
                  variant="outlined"
                  sx={{ marginTop: '10px' }}
                >
                  GitHub
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </HeaderWrapper>
  );
}
