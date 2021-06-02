import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FriendsList } from './FriendsList'

export function CompareFriends({ compareData, setCompareData }) {
  const [open, setOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    async function loadFriends() {
      try {
        const friendsResponse = await fetch(`/api/friends`, {
          credentials: 'include',
        });
        if (friendsResponse.status === 200) {
          const friends = await friendsResponse.json();
          setFriends(friends["users"] || []);
        }
      } catch (error) {
        setFriends([]);
        return;
      }
    }
    loadFriends();
  }, []);

  function randomInt() {
    return Math.floor((Math.random() * 100) + 1);
  }

  function handleConfirm() {
    setOpen(false);
    console.log(selectedUser);
    setCompareData({
      label: `${selectedUser.name}'s network diversity`,
      data: [randomInt(), randomInt(), randomInt(), 20, 16],
      fill: true,
      backgroundColor: 'rgba(165, 180, 252, 0.4)',
      borderColor: 'rgba(165, 180, 252)',
      pointBackgroundColor: 'rgba(165, 180, 252)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(165, 180, 252)',
      pointStyle: 'circle'
    })
    // TODO: load from backend
  }

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={open} onClose={() => {}}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                  <div>
                    <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                      <div className="-ml-4 -mt-2 flex items-cente sm:flex-nowrap">
                        <button
                          type="button"
                          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </button>

                        <div className="ml-2 mt-2">
                          <p className="text-ml font-small text-gray-900">Compare Friends</p>
                        </div>

                        <button
                          type="submit"
                          className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={handleConfirm}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                    <FriendsList friends={friends} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                  </div>
                </div>
              </Transition.Child>
            </div>
        </Dialog>
      </Transition.Root>
      <button type="button" className="inline-flex justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setOpen(true)}>Select a friend to compare</button>
    </>
  )
}