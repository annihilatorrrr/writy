import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addTemplateSection } from "slices/template";

interface IProps {
  positionOfSection: number;
}

const AddNewSection: FC<IProps> = ({ positionOfSection }) => {
  const dispatch = useDispatch();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const handleNewSectionAddition = (sectionType: string) => {
    switch (sectionType) {
      case "navbar":
        const navbarSectionData = require("data/sections/navbar");

        dispatch(
          addTemplateSection({
            positionOfSection,
            sectionContent: navbarSectionData,
          })
        );

        break;

      case "hero":
        const heroSectionData = require("data/sections/hero");

        dispatch(
          addTemplateSection({
            positionOfSection,
            sectionContent: heroSectionData,
          })
        );

        break;

      case "features":
        const featuresSectionData = require("data/sections/features");

        dispatch(
          addTemplateSection({
            positionOfSection,
            sectionContent: featuresSectionData,
          })
        );

        break;

      default:
        break;
    }

    onClose();
  };

  const sectionButtonsNode = () => {
    const sections = [
      { key: "navbar", label: "Navbar", icon: <MdAdd /> },
      { key: "hero", label: "Hero", icon: <MdAdd /> },
      { key: "features", label: "Features", icon: <MdAdd /> },
    ];

    return (
      <VStack spacing={4} align="left">
        {sections.map((section: any, index: number) => {
          return (
            <Button
              key={index}
              leftIcon={section.icon}
              size="lg"
              onClick={() => handleNewSectionAddition(section.key)}
            >
              Add {section.label} section
            </Button>
          );
        })}
      </VStack>
    );
  };

  return (
    <Flex alignItems="center" justifyContent="center" p={4}>
      <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <PopoverTrigger>
          <Button leftIcon={<MdAdd />} w="100%" size="sm" disabled={isOpen}>
            Add
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>{sectionButtonsNode()}</PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Flex>
  );
};

export default AddNewSection;