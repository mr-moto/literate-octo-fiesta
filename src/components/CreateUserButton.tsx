'use client';
import { useMainContext } from '@/contexts/MainContext';
import { TUser } from '@/types/user';
import { useState } from 'react';

export const CreateUserButton = () => {
  const { createUser } = useMainContext();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<TUser>({
    name: '',
    email: '',
    phone: '',
    website: '',
    company: {
      name: '',
    },
  });

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} disabled={open}>
        Create User
      </button>
      {open && (
        <div>
          <div>
            <label htmlFor="name">name</label>
            <input
              type="text"
              className="border border-black"
              id="name"
              value={user.name}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div>
            <label htmlFor="email">email</label>
            <input
              type="text"
              className="border border-black"
              id="email"
              value={user.email}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div>
            <label htmlFor="phone">phone</label>
            <input
              type="text"
              className="border border-black"
              id="phone"
              value={user.phone}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </div>
          <div>
            <label htmlFor="website">website</label>
            <input
              type="text"
              className="border border-black"
              id="website"
              value={user.website}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, website: e.target.value }))
              }
            />
          </div>
          <div>
            <label htmlFor="company">company name</label>
            <input
              type="text"
              className="border border-black"
              id="company"
              value={user.company.name}
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  company: { name: e.target.value },
                }))
              }
            />
          </div>
          <button type="button" onClick={() => createUser(user)}>
            create
          </button>
          <button type="button" onClick={() => setOpen(false)}>
            Cancel
          </button>
        </div>
      )}
    </>
  );
};
