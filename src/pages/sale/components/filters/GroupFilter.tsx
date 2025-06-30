import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

import type { GroupTreeItem } from '@/utils/groupTreeUtils'

interface GroupFilterProps {
  value: string[]
  onChange: (value: string[]) => void
  options: GroupTreeItem[]
}

const GroupFilter: React.FC<GroupFilterProps> = ({
  value,
  onChange,
  options,
}) => {
  const [expanded, setExpanded] = useState<string[]>(options.map((g) => g.id))
  const allChildIds = options.flatMap((g) => g.children?.map((c) => c.id) || [])

  const isAllSelected =
    allChildIds.length > 0 && allChildIds.every((id) => value.includes(id))

  const handleAll = () => {
    if (isAllSelected) onChange([])
    else onChange(allChildIds)
  }

  const handleParentToggle = (group: GroupTreeItem) => {
    const childIds = group.children?.map((c) => c.id) || []
    const isGroupSelected = childIds.every((id) => value.includes(id))
    if (isGroupSelected) {
      onChange(value.filter((v) => !childIds.includes(v)))
    } else {
      onChange([...value, ...childIds.filter((id) => !value.includes(id))])
    }
  }

  const handleChildToggle = (id: string) => {
    if (value.includes(id)) onChange(value.filter((g) => g !== id))
    else onChange([...value, id])
  }

  const handleExpandToggle = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    )
  }

  return (
    <Box>
      <Typography fontWeight="bold" fontSize={14} mb={0.5}>
        Lọc theo nhóm hàng
      </Typography>
      <FormControlLabel
        control={<Checkbox checked={isAllSelected} onChange={handleAll} />}
        label={<Typography fontSize={14}>Tất cả</Typography>}
        sx={{ ml: 0, mb: -1 }}
      />
      {options.map((group) => {
        const childIds = group.children?.map((c) => c.id) || []
        const isGroupSelected =
          childIds.length > 0 && childIds.every((id) => value.includes(id))
        const isGroupIndeterminate =
          childIds.some((id) => value.includes(id)) && !isGroupSelected
        const isExpanded = expanded.includes(group.id)
        return (
          <Box key={group.id} mb={0.2}>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                cursor: 'pointer',
                '&:hover': { bgcolor: '#f5f5f5' },
                borderRadius: 1,
              }}
              onClick={() => handleExpandToggle(group.id)}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 0,
                }}
              >
                {isExpanded ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline
                      points="4,6 8,10 12,6"
                      stroke="#222"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline
                      points="6,4 10,8 6,12"
                      stroke="#222"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isGroupSelected}
                    indeterminate={isGroupIndeterminate}
                    onChange={(e) => {
                      e.stopPropagation()
                      handleParentToggle(group)
                    }}
                  />
                }
                label={
                  <Typography fontWeight="bold" fontSize={14}>
                    {group.label}
                  </Typography>
                }
                sx={{ ml: 0, mb: -1 }}
                onClick={(e) => e.stopPropagation()}
              />
            </Box>
            {isExpanded && (
              <Box
                sx={{
                  pl: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  my: 0,
                }}
              >
                {group.children?.map((child) => (
                  <FormControlLabel
                    key={child.id}
                    control={
                      <Checkbox
                        checked={value.includes(child.id)}
                        onChange={() => handleChildToggle(child.id)}
                      />
                    }
                    label={<Typography fontSize={14}>{child.label}</Typography>}
                    sx={{
                      '&:hover': { bgcolor: '#f5f5f5' },
                      borderRadius: 1,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                ))}
              </Box>
            )}
          </Box>
        )
      })}
    </Box>
  )
}

export default GroupFilter
