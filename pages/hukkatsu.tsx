/* eslint-disable no-nested-ternary */
import {
  Badge,
  Box,
  HStack,
  Select,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import type { NextPage } from 'next';
import { useState } from 'react';
import { useQuery } from 'react-query';

import {
  ForIonicBase7PoffRequestBody,
  ForIonicBase7PoffResponseBody,
} from './api/ForIonicBase7Poff';
import { ForIonicFukatsu } from './api/types/ForIonicFukatsu';

// type HukkatuProps = {
//   baseData: ForIonicBase7Poff[];
// };
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault('Asia/Tokyo');

const Hukkatu: NextPage = () => {
  const { data: hukkatsuData, isLoading: isHukkatsuDataLoading } = useQuery<
    ForIonicFukatsu[]
  >(
    'ForIonicFukatsu',
    async () => {
      return (await axios.get<ForIonicFukatsu[]>('/api/ForIonicFukatsu')).data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      retry: false,
    }
  );

  const { data: baseData, isLoading: isBaseDataLoading } = useQuery<
    ForIonicBase7PoffResponseBody['data']
  >(
    'ForIonicBase7Poff',
    async () => {
      let data: ForIonicBase7PoffResponseBody['data'] = [];
      let nextCode: string | undefined;
      do {
        const reqData: ForIonicBase7PoffRequestBody = {
          maxLength: 1100,
          nextCode,
        };
        const r =
          // prettier-ignore
          (
          // eslint-disable-next-line no-await-in-loop
          await axios.post<ForIonicBase7PoffResponseBody>(
            '/api/ForIonicBase7Poff',reqData
          )
        ).data;
        data = [...data, ...r.data];
        nextCode = r.nextCode;
      } while (nextCode);

      return data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      retry: false,
    }
  );

  const [selectedSyoken, setSelectedSyoken] = useState<string>('all');
  // const [selectedMonth, setSelectedMonth] = useState<string>(
  //   String(new Date().getMonth() + 1)
  // );

  const cardListSkelton = (
    <Stack m={3}>
      <Stack rounded="md" borderWidth="1px" p={2}>
        <Skeleton height="1rem" />
        <Skeleton height="1rem" />
      </Stack>
      <Stack rounded="md" borderWidth="1px" p={2}>
        <Skeleton height="1rem" />
        <Skeleton height="1rem" />
      </Stack>
      <Stack rounded="md" borderWidth="1px" p={2}>
        <Skeleton height="1rem" />
        <Skeleton height="1rem" />
      </Stack>
    </Stack>
  );
  const cardList = (
    <Stack m={3}>
      {hukkatsuData
        ?.filter((v) =>
          selectedSyoken === 'all' ? true : selectedSyoken === v.syoken
        )
        .map((v) => {
          const meigara = baseData?.find((f) => f.code === v.code);
          return (
            <Box
              rounded="md"
              borderWidth="1px"
              p={2}
              key={`${v.syoken}${v.code}${v.time}`}
            >
              <Text>
                {dayjs(Number(v.time))
                  .tz('Asia/Tokyo')
                  .format('YYYY/MM/DD(ddd) hh:mm:ss')}
              </Text>
              <HStack>
                <ShokenBadge shoken={v.syoken} />
                <Text size="sm" fontWeight="bold">
                  {`${v.code} ${meigara?.name || ''} 数量:${v.vol}`}
                </Text>
              </HStack>
              {meigara && <Text>{meigara.yutai}</Text>}
              {/* {JSON.stringify(v)} */}
            </Box>
          );
        })}
    </Stack>
  );

  return (
    <Box>
      <HStack m={3}>
        <Select
          defaultValue={selectedSyoken}
          onChange={(e) => setSelectedSyoken(e.currentTarget.value)}
        >
          <option value="all">ALL</option>
          <option value="n">日興</option>
          <option value="s">SBI</option>
          <option value="k">カブコム</option>
          <option value="g">GMO</option>
          <option value="r">楽天</option>
          <option value="x">マネックス</option>
          <option value="m">松井</option>
        </Select>
        {/* <Select
          defaultValue={selectedMonth}
          onChange={(v) => setSelectedMonth(v.currentTarget.value)}
        >
          {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            [...new Array(12)].map((_, i) => {
              const month = i + 1;
              return <option value={month}>{month}月</option>;
            })
          }
        </Select> */}
        {/* <Select placeholder="Select option">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select> */}
      </HStack>
      {isHukkatsuDataLoading || isBaseDataLoading ? cardListSkelton : cardList}
      {/* <Box>{JSON.stringify(hukkatsuData)}</Box> */}
    </Box>
  );
};

export default Hukkatu;

type ShokenBadgeProps = {
  shoken: 'n' | 's' | 'k' | 'g' | 'r' | 'x' | 'm';
};
const ShokenBadge: React.FC<ShokenBadgeProps> = ({ shoken }) => {
  switch (shoken) {
    case 'n':
      return <Badge colorScheme="red">日興</Badge>;
    case 's':
      return <Badge colorScheme="blue">SBI</Badge>;
    case 'k':
      return <Badge colorScheme="orange">カブコム</Badge>;
    case 'g':
      return <Badge colorScheme="blue">GMO</Badge>;
    case 'r':
      return <Badge colorScheme="purple">楽天</Badge>;
    case 'x':
      return <Badge colorScheme="teal">マネックス</Badge>;
    case 'm':
      return <Badge colorScheme="pink">松井</Badge>;
    default:
      return <Badge>{shoken}</Badge>;
  }
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // APIやDBからのデータ取得処理などを記載
//   let baseData: ForIonicBase7Poff[];
//   try {
//     baseData = (
//       await axios.post<ForIonicBase7Poff[]>(
//         'https://gokigen-life.tokyo/api/00ForWeb/ForIonicBase7Poff.php',
//         undefined,
//         {
//           headers: {
//             Origin: 'ionic://localhost',
//             'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)',
//           },
//         }
//       )
//     ).data;
//   } catch (error) {
//     baseData = [];
//   }

//   const props: HukkatuProps = {
//     baseData,
//   };

//   return {
//     props,
//   };
// };
