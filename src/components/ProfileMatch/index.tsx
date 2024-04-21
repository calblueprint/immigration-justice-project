'use client';

import { H3 } from "@/styles/text";
import Icon from "../Icon";
import { Flex } from "@/styles/containers";
import { Listing } from "@/types/schema";

const matchIcon = (match: boolean) => {
  if (match) {
    return <Icon type="green_check" />; // rename to greenCheck later 
  }
  return  <Icon type="redCheck" />; 
}

export default function ProfileMatch(listingData: Listing) {
  return (
  <Flex $direction="column" $gap="30px">
    <H3>Profile Match</H3>
    <Flex $direction="column" $gap="15px">

    </Flex>
  </Flex>
  )
};
