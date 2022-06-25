/* eslint-disable no-nested-ternary */
import { Box, HStack, Select, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import dayjs from 'dayjs';
import type { NextPage } from 'next';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { ForIonicBase7Poff } from '../mock/api/ForIonicBase7Poff';
import { ForIonicFukatsu } from '../mock/api/ForIonicFukatsu';

const Hukkatu: NextPage = () => {
  const { data: hukkatsuData } = useQuery<typeof ForIonicFukatsu>(
    'ForIonicFukatsu',
    async () => {
      return (await axios.get<typeof ForIonicFukatsu>('/api/ForIonicFukatsu'))
        .data;
    }
  );

  const { data: allData } = useQuery<typeof ForIonicBase7Poff>(
    'ForIonicBase7Poff',
    async () => {
      return (
        await axios.get<typeof ForIonicBase7Poff>('/api/ForIonicBase7Poff')
      ).data;
    }
  );

  const [selectedSyoken, setSelectedSyoken] = useState<string>('all');
  // const [selectedMonth, setSelectedMonth] = useState<string>(
  //   String(new Date().getMonth() + 1)
  // );

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
      <Stack m={3}>
        {hukkatsuData
          ?.filter((v) =>
            selectedSyoken === 'all' ? true : selectedSyoken === v.syoken
          )
          .map((v) => {
            const shoken =
              v.syoken === 'n'
                ? '日興'
                : v.syoken === 's'
                ? 'SBI'
                : v.syoken === 'k'
                ? 'カブコム'
                : v.syoken === 'g'
                ? 'GMO'
                : v.syoken === 'r'
                ? '楽天'
                : v.syoken === 'x'
                ? 'マネックス'
                : v.syoken === 'm'
                ? '松井'
                : v.syoken;

            const meigara = allData?.find((f) => f.code === v.code);
            return (
              <Box
                rounded="md"
                borderWidth="1px"
                p={2}
                key={`${v.syoken}${v.code}${v.time}`}
              >
                <Text size="sm" fontWeight="bold">
                  {`[${shoken}] (${dayjs(v.time).format('hh:mm:ss')}) ${
                    meigara?.name || ''
                  } ${v.code}  数量:${v.vol}`}
                </Text>
                {meigara && <Text>{meigara.yutai}</Text>}
                {/* {JSON.stringify(v)} */}
              </Box>
            );
          })}
      </Stack>
      {/* <Box>{JSON.stringify(hukkatsuData)}</Box> */}
    </Box>
  );
};

export default Hukkatu;
