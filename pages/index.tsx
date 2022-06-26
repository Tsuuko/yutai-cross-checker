import { Box, Link } from '@chakra-ui/react';
import axios from 'axios';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import { useQuery } from 'react-query';

import { ForIonicBase7Poff } from '../mock/api/ForIonicBase7Poff';

const Home: NextPage = () => {
  const { data } = useQuery<typeof ForIonicBase7Poff>('todos', async () => {
    return (await axios.get<typeof ForIonicBase7Poff>('/api/ForIonicBase7Poff'))
      .data;
  });
  return (
    <Box>
      <Link as={NextLink} href="/hukkatsu">
        hukkatsu
      </Link>

      {/* <Button>aaa</Button>
      <Stack>
        {data?.map((v) => (
          <Box rounded="md" borderWidth="1px">
            <Heading size="sm">
              {v.code} {v.name}
            </Heading>
            <Text>{v.yutai}</Text>
            <Text>{v.taisyaku}</Text>
          </Box>
        ))}
      </Stack>
      <Box>{JSON.stringify(data)}</Box> */}
    </Box>
  );
};

export default Home;
