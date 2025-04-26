import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


interface TechnicalSpecificationsProps {
  specifications: Record<string, string>;
}

export default function TechnicalSpecifications({ specifications }: TechnicalSpecificationsProps) {
  if (!specifications || Object.keys(specifications).length === 0) {
    return null; // Don't render anything if there are no specs
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Technical Specifications</CardTitle>
        </CardHeader>
        <CardContent>
             <Table>
              <TableBody>
                {Object.entries(specifications).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="font-medium w-1/3">{key}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
    </Card>

  );
}
