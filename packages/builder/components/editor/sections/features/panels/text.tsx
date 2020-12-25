import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { ChangeEvent, FC } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getSectionData } from "selectors/template";
import {
  addTemplateSectionData,
  removeTemplateSectionData,
  updateTemplateSectionData,
  updateTemplateSectionMeta,
} from "slices/template";

interface IProps {
  positionOfSection: number;
}

const FeaturesSectionEditorTextPanel: FC<IProps> = ({ positionOfSection }) => {
  const dispatch = useDispatch();
  const { data, meta } = useSelector(getSectionData(positionOfSection));

  const handleMetaChange = (itemType: string, value: string) => {
    dispatch(
      updateTemplateSectionMeta({
        positionOfSection,
        itemType,
        value,
      })
    );
  };

  const handleDataChange = (
    itemPosition: number,
    itemType: string,
    value: string
  ) => {
    dispatch(
      updateTemplateSectionData({
        positionOfSection,
        itemType: "cards",
        itemPosition,
        key: itemType,
        value,
      })
    );
  };

  const handleDataAddition = () => {
    const initialValue = {
      heading: "Heading",
      subHeading: "This is a sub-heading",
    };

    dispatch(
      addTemplateSectionData({
        positionOfSection,
        itemType: "cards",
        value: initialValue,
      })
    );
  };

  const handleDataDeletion = (itemPosition: number) => {
    dispatch(
      removeTemplateSectionData({
        positionOfSection,
        itemType: "cards",
        itemPosition,
      })
    );
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Heading</FormLabel>
        <Input
          value={meta.heading}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleMetaChange("heading", e.currentTarget.value)
          }
        />
      </FormControl>
      {data.cards.map((card: any, index: number) => {
        return (
          <HStack spacing={4} key={index} alignItems="flex-end">
            <FormControl>
              <FormLabel>Card {index + 1} heading</FormLabel>
              <Input
                value={card.heading}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleDataChange(index, "heading", e.currentTarget.value)
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Card {index + 1} sub-heading</FormLabel>
              <Input
                value={card.subHeading}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleDataChange(index, "subHeading", e.currentTarget.value)
                }
              />
            </FormControl>
            <IconButton
              aria-label="Delete"
              icon={<MdDelete />}
              colorScheme="red"
              variant="outline"
              onClick={() => handleDataDeletion(index)}
            />
          </HStack>
        );
      })}
      <Button
        leftIcon={<MdAdd />}
        colorScheme="blue"
        onClick={handleDataAddition}
      >
        Add card
      </Button>
    </VStack>
  );
};

export default FeaturesSectionEditorTextPanel;