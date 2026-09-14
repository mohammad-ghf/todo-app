import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

type todoDescriptionProps = {
  description: string;
  todoId: number;
  title: string;
};

const TodoDescription = ({
  description,
  todoId,
  title,
}: todoDescriptionProps) => {
  if (!description.trim()) return null;

  if (!description.trim()) {
    return <p>{title}</p>;
  }

  return (
    <Accordion>
      <AccordionItem className="" value={`description-${todoId}`}>
        <AccordionTrigger className="">{title}</AccordionTrigger>

        <AccordionContent className="">{description}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TodoDescription;
