import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Checkbox,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import "./Styles/DepartmentList.css"

interface Department {
  id: number;
  name: string;
  subDepartments: SubDepartment[];
}

interface SubDepartment {
  id: number;
  name: string;
}

const initialDepartments: Department[] = [
  {
    id: 1,
    name: 'Department A',
    subDepartments: [
      { id: 1, name: 'Sub Department A1' },
      { id: 2, name: 'Sub Department A2' },
    ],
  },
  {
    id: 2,
    name: 'Department B',
    subDepartments: [
      { id: 3, name: 'Sub Department B1' },
      { id: 4, name: 'Sub Department B2' },
    ],
  },
  // Add more departments as needed
];

const DepartmentList = () => {
  const [openDepartments, setOpenDepartments] = useState<number[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<number[]>([]);

  const handleToggleDepartment = (departmentId: number) => {
    if (openDepartments.includes(departmentId)) {
      setOpenDepartments(openDepartments.filter(id => id !== departmentId));
    } else {
      setOpenDepartments([...openDepartments, departmentId]);
    }
  };

  const handleToggleSubDepartment = (subDepartmentId: number) => {
    if (selectedSubDepartments.includes(subDepartmentId)) {
      setSelectedSubDepartments(selectedSubDepartments.filter(id => id !== subDepartmentId));
      // Also, ensure to deselect the parent department if no sub-departments are selected
      const parentDepartment = initialDepartments.find(dep =>
        dep.subDepartments.some(subDep => subDep.id === subDepartmentId)
      );
      if (parentDepartment) {
        setSelectedDepartments(
          selectedDepartments.filter(id => id !== parentDepartment.id)
        );
      }
    } else {
      setSelectedSubDepartments([...selectedSubDepartments, subDepartmentId]);
      // Automatically select the parent department when all its sub-departments are selected
      const parentDepartment = initialDepartments.find(dep =>
        dep.subDepartments.some(
          subDep => subDep.id === subDepartmentId && !selectedSubDepartments.includes(subDep.id)
        )
      );
      if (parentDepartment) {
        setSelectedDepartments([...selectedDepartments, parentDepartment.id]);
      }
    }
  };

  


  const handleToggleDepartmentAndSubDepartments = (departmentId: number) => {
    const department = initialDepartments.find(dep => dep.id === departmentId);
    if (!department) return;

    const allSubDepartmentsSelected =
      department.subDepartments.every(subDep =>
        selectedSubDepartments.includes(subDep.id)
      );

    if (allSubDepartmentsSelected) {
      setSelectedDepartments(selectedDepartments.filter(id => id !== departmentId));
      setSelectedSubDepartments(
        selectedSubDepartments.filter(id => !department.subDepartments.map(subDep => subDep.id).includes(id))
      );
    } else {
      setSelectedDepartments([...selectedDepartments, departmentId]);
      setSelectedSubDepartments([
        ...selectedSubDepartments,
        ...department.subDepartments.map(subDep => subDep.id),
      ]);
    }
  };

  // Logic to handle parent department selection based on all sub-departments
  const handleParentDepartmentSelection = (departmentId: number) => {
    const department = initialDepartments.find(dep => dep.id === departmentId);
    if (!department) return;

    const allSubDepartmentsSelected =
      department.subDepartments.every(subDep =>
        selectedSubDepartments.includes(subDep.id)
      );

    if (allSubDepartmentsSelected) {
      setSelectedDepartments([...selectedDepartments, departmentId]);
    } else {
      setSelectedDepartments(selectedDepartments.filter(id => id !== departmentId));
    }
  };

  // Check if all sub-departments of a department are selected
  const areAllSubDepartmentsSelected = (departmentId: number) => {
    const department = initialDepartments.find(dep => dep.id === departmentId);
    if (!department) return false;

    return department.subDepartments.every(subDep =>
      selectedSubDepartments.includes(subDep.id)
    );
  };

  return (
    <List className="department-list-container">
    {initialDepartments.map(department => (
      <div key={department.id}>
        <ListItem disablePadding>
          <ListItemButton
            className="list-item-button"
            onClick={() => handleToggleDepartment(department.id)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={
                  areAllSubDepartmentsSelected(department.id) &&
                  selectedDepartments.includes(department.id)
                }
                indeterminate={
                  selectedSubDepartments.some(subDep =>
                    department.subDepartments.map(sub => sub.id).includes(subDep)
                  )
                }
                onClick={event => {
                  event.stopPropagation();
                  handleToggleDepartmentAndSubDepartments(department.id);
                }}
                className="checkbox"
              />
            </ListItemIcon>
            <ListItemText primary={department.name} className="list-item-text" />
            {openDepartments.includes(department.id) ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openDepartments.includes(department.id)} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {department.subDepartments.map(subDepartment => (
              <ListItem key={subDepartment.id} className="sub-list-item" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedSubDepartments.includes(subDepartment.id)}
                    onClick={event => {
                      event.stopPropagation();
                      handleToggleSubDepartment(subDepartment.id);
                      handleParentDepartmentSelection(department.id);
                    }}
                    className="checkbox"
                  />
                </ListItemIcon>
                <ListItemText primary={subDepartment.name} className="sub-list-item-text" />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </div>
    ))}
  </List>
  );
};

export default DepartmentList;
