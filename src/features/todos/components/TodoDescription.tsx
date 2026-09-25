import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  return (
    <Accordion>
      <AccordionItem value={`description-${todoId}`}>
        <AccordionTrigger>{title}</AccordionTrigger>

        <AccordionContent>
          {description.trim() ? <p>{description}</p> : <p> Nothing to show</p>}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TodoDescription;
