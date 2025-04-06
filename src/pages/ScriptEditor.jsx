import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db, collection } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const ScriptEditor = () => {
  const { scriptId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [script, setScript] = useState({
    title: '',
    genre: '',
    synopsis: '',
    characters: [],
    scenes: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchScript = async () => {
      if (scriptId === 'new') {
        setIsLoading(false);
        return;
      }

      try {
        const scriptDoc = await getDoc(doc(db, 'scripts', scriptId));
        if (scriptDoc.exists()) {
          setScript(scriptDoc.data());
        } else {
          console.error('Script not found');
          navigate('/director-dashboard');
        }
      } catch (error) {
        console.error('Error fetching script:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScript();
  }, [scriptId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScript(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCharacterChange = (index, field, value) => {
    const updatedCharacters = [...script.characters];
    updatedCharacters[index] = {
      ...updatedCharacters[index],
      [field]: value
    };
    setScript(prev => ({
      ...prev,
      characters: updatedCharacters
    }));
  };

  const addCharacter = () => {
    setScript(prev => ({
      ...prev,
      characters: [
        ...prev.characters,
        { name: '', description: '', role: '' }
      ]
    }));
  };

  const removeCharacter = (index) => {
    setScript(prev => ({
      ...prev,
      characters: prev.characters.filter((_, i) => i !== index)
    }));
  };

  const handleSceneChange = (index, field, value) => {
    const updatedScenes = [...script.scenes];
    updatedScenes[index] = {
      ...updatedScenes[index],
      [field]: value
    };
    setScript(prev => ({
      ...prev,
      scenes: updatedScenes
    }));
  };

  const addScene = () => {
    setScript(prev => ({
      ...prev,
      scenes: [
        ...prev.scenes,
        { title: '', description: '', location: '', timeOfDay: '' }
      ]
    }));
  };

  const removeScene = (index) => {
    setScript(prev => ({
      ...prev,
      scenes: prev.scenes.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const scriptData = {
        ...script,
        directorId: currentUser.uid,
        lastModified: new Date()
      };

      if (scriptId === 'new') {
        const newScriptRef = doc(collection(db, 'scripts'));
        await setDoc(newScriptRef, scriptData);
        navigate(`/director/script/${newScriptRef.id}`);
      } else {
        await updateDoc(doc(db, 'scripts', scriptId), scriptData);
      }
    } catch (error) {
      console.error('Error saving script:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {scriptId === 'new' ? 'New Script' : 'Edit Script'}
          </h1>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Script'}
          </button>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-[#1A1F2C] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={script.title}
                  onChange={handleInputChange}
                  className="w-full bg-[#2A2F3C] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Genre</label>
                <input
                  type="text"
                  name="genre"
                  value={script.genre}
                  onChange={handleInputChange}
                  className="w-full bg-[#2A2F3C] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Synopsis</label>
                <textarea
                  name="synopsis"
                  value={script.synopsis}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-[#2A2F3C] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Characters */}
          <div className="bg-[#1A1F2C] rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Characters</h2>
              <button
                onClick={addCharacter}
                className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Add Character
              </button>
            </div>
            <div className="space-y-4">
              {script.characters.map((character, index) => (
                <div key={index} className="bg-[#2A2F3C] rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium">Character {index + 1}</h3>
                    <button
                      onClick={() => removeCharacter(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        value={character.name}
                        onChange={(e) => handleCharacterChange(index, 'name', e.target.value)}
                        className="w-full bg-[#1A1F2C] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Role</label>
                      <input
                        type="text"
                        value={character.role}
                        onChange={(e) => handleCharacterChange(index, 'role', e.target.value)}
                        className="w-full bg-[#1A1F2C] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={character.description}
                        onChange={(e) => handleCharacterChange(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full bg-[#1A1F2C] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scenes */}
          <div className="bg-[#1A1F2C] rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Scenes</h2>
              <button
                onClick={addScene}
                className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Add Scene
              </button>
            </div>
            <div className="space-y-4">
              {script.scenes.map((scene, index) => (
                <div key={index} className="bg-[#2A2F3C] rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium">Scene {index + 1}</h3>
                    <button
                      onClick={() => removeScene(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <input
                        type="text"
                        value={scene.title}
                        onChange={(e) => handleSceneChange(index, 'title', e.target.value)}
                        className="w-full bg-[#1A1F2C] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <input
                          type="text"
                          value={scene.location}
                          onChange={(e) => handleSceneChange(index, 'location', e.target.value)}
                          className="w-full bg-[#1A1F2C] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Time of Day</label>
                        <input
                          type="text"
                          value={scene.timeOfDay}
                          onChange={(e) => handleSceneChange(index, 'timeOfDay', e.target.value)}
                          className="w-full bg-[#1A1F2C] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={scene.description}
                        onChange={(e) => handleSceneChange(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full bg-[#1A1F2C] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptEditor; 